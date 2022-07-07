---
id: 1620700048294pqor3i8hb
title: How to make Concurrent Requests with Fetch API
published_at: 2021-05-11T02:27:10.188Z
tags: javascript, fetch, api
excerpt: Fetch API is a web api for making network requests and fetching resources with JavaScript. Calling fetch returns a promise response that...
slug: how-to-make-concurrent-requests-with-fetch-api
crosspostedOn: ''
crosspostLink: ''
coverImage: https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/concurrent_fetch_example.png?alt=media&token=be235c2c-93e7-46ae-9b80-390feacb15fc
---

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) is a web api for making network requests and fetching resources with JavaScript. Calling fetch returns a promise response that can be managed in various ways.

A GET request can be simple as calling the global `fetch` method:

```jsx
fetch('https://jsonplaceholder.typicode.com/posts/')
```

It returns a response object that contains all the information about the response such as HTTP headers, status, type, and body.

```json
...
Response {
	ok: true
	status: 200
	type: "cors"
	url: "https://jsonplaceholder.typicode.com/posts"
	body: (...)
}
```

## Response handling

Working with promises allows us to easily handle asynchronous operations. Using the promise chain we can treat response data once the request has been done.

`.then` call provide a callback function that receives the result of the previous promise and can perform computation and return another promise afterward, for instance, the response body converted to JSON.

`.catch` is used to catch errors anywhere in the chain, for instance, when there's a network failure.

```js
fetch('https://jsonplaceholder.typicode.com/posts/', options)
  .then(onFulfilled, onRejected)
  .then((data) => console.log(data))
  .catch((err) => console.error('[request failed]', err.message))
```

Fetch will only reject a promise in case of network issues, which means HTTP errors, such as Not Found (404), should be managed inside `then()` callback.

Handlers can be implemented as such:

```js
const onFulfilled = (response) => {
  if (response.status !== 200 && !response.ok) {
    throw new Error(`[${response.status}] Unable to fetch resource`)
  }
  return response.json()
}

const onRejected = (err) => {
  console.error(err)
}
```

You can do pretty much the same with async/await syntax sugar:

```js
async function getPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/')

    if (response.status !== 200 && !response.ok) {
      throw new Error(`${response.status}: Unable to fetch resource`)
    }

    const json = await response.json()
    return json
  } catch (error) {
    console.error('[request failed]', error.message)
  }
}
```

## How to fetch multiple endpoints

We often see web apps using **REST APIs** to talk to backend services, and there might be scenarios where the data you need to fetch is located on different endpoints or routes.

One way to pull that information is to make sequential requests to the API:

```js
/* Let's imagine we need a structure like this:
{
	...todo data,
	user: ...Todo author user data
}
*/

async function getTodo(todoId) {
  try {
    const todoResponse = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    )
    const todo = await todoResponse.json()
    // User depends on todo response
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${todo.userId}/`
    )
    const user = await userResponse.json()

    return { ...todo, user }
  } catch (error) {
    console.error('[request failed]', error.message)
  }
}
```

For simple requests that work, but as your project gets larger and you start to see something like multiple dependent resources and pagination, you would need something more performant and manageable.

## Concurrent Requests

Let's imagine we have the following situation:

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/concurrent_fetch_example.png?alt=media&token=be235c2c-93e7-46ae-9b80-390feacb15fc" height="545" width="870" />

Where we need to get the first 10 posts, once we get then we fetch all of comments and users author of each post concurrently.

Concurrency is about **dealing with multiple things at the same time**. In this case, what we need is to execute multiple request promises at the same time.

`Promise.all()` is a method that takes an array of promises to resolve and return the result of input promises. It will reject if any of the promises rejecting or throwing an error.

```js
const fakeApi = (data, ms) =>
  new Promise((resolve, reject) => {
    return setTimeout(() => resolve({ data }), ms)
  })

await Promise.all([
  fakeApi('Hello 1', 1000),
  fakeApi('Hello 2', 1200),
  fakeApi('Hello 3', 500),
])
```

`Promise.all()` is incredibly more performant than a normal fetch since it can handle multiple requests at once. On the other hand, `Promise.allSettled()` will wait for all promises to finish, regardless of whether or not it rejects.

In order to solve our scenario, we first need to fetch our posts from the remote API:

```js
const getPosts = (page = 1, limit = 10) =>
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
  )
    .then(onFulfilled, onRejected)
    .catch(err => console.error('[request failed]', err.message));

const getComments = postId =>
	fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
	   .then(onFulfilled, onRejected)
	   .catch(err => console.error('[request failed]', err.message));

const getUser = userId =>
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/`, fetchOptions)
    .then(onFulfilled, onRejected)
    .catch(err => console.error('[request failed]', err.message));

async function main() {
	try {
		// Get first 10 posts
    const posts = await getPosts(1);
		/* TODO */
	} catch () {
		throw new Error('Request failed to retrieve resource');
	}
}
```

Then for each post, we populate an array of comment promises and wait for them to fulfill.

```js
  ...
  const commentPromises = [];
  for (const post of posts) {
    commentPromises.push(getComments(post.id));
  }
  // Get comments concurrently
  const comments = await Promise.all([...commentPromises]);
```

Now we do the same to look for post authors and retrieve user information:

```js
  ...
  const usersPromises = [];
  const ids = [...new Set(posts.map(p => p.userId))];
  for (const userId of ids) {
    usersPromises.push(getUser(userId));
  }

  // Get users concurrently
  const users = await Promise.all([...usersPromises]);
```

Doing so, our final result will be:

```js
async function main() {
  try {
    // Get first 10 posts
    const posts = await getPosts(1)

    const commentPromises = []
    for (const post of posts) {
      commentPromises.push(getComments(post.id))
    }

    // Get comments concurrently
    const comments = await Promise.all([...commentPromises])

    const usersPromises = []
    const ids = [...new Set(posts.map((p) => p.userId))]
    for (const userId of ids) {
      usersPromises.push(getUser(userId))
    }

    // Get users concurrently
    const users = await Promise.all([...usersPromises])

    const data = posts.map((post, i) => ({
      ...post,
      user: users.find((user) => user.id === post.userId),
      comments: comments[i],
    }))

    return data
  } catch (err) {
    throw new Error('Request failed to retrieve resources')
  }
}
```

If you look at the network tab, under the waterfall column, you'll notice all of the comments and users are been queued and fetched nearly at the same time.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/waterfall.png?alt=media&token=9ec0a7e2-984a-4c81-b9be-1ff40a75a833" width="870" height="580" />

Performing multiple queries/requests is a common daily task and you can use this solution not only with Fetch but with any other HTTP Client promise-based library of your choice.
