---
id: 632825119935504
title: Understanding the Wild World of Web Rendering Patterns
published_at: 2024-08-16T01:10:15.629Z
tags: frameworks, web rendering
excerpt: SSR, SSG, ISR, PPR—these are acronyms that might initially seem like a confusing and intimidating alphabet soup.  However, understanding them doesn't have to be a daunting task...
slug: understanding-the-wild-world-of-web-rendering-patterns
crosspostedOn: ''
crosspostLink: ''
og_image: https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/og%2Funderstanding-the-wild-world-of-web-rendering-patterns.webp?alt=media&token=c937218e-e20e-4886-9c93-0ced3896b22e
---

SSR, SSG, ISR, PPR—these are acronyms that might initially seem like a confusing and intimidating alphabet soup.  However, understanding them doesn't have to be a daunting task. Each of these terms represents a different strategy or methodology, and with a little bit of explanation, they can become much clearer and less frightening.

This post aims to demystify these concepts, providing a clear and comprehensive guide to help developers choose the right strategy for their projects.

Let's go!

## Static

Early websites on the web were simple and static text documents, which were served from a basic web server architecture where every person would see the same copy of the page served from a HTTP request.

Static pages (or static rendering) can have many *variations* to serve different purposes, from plain HTML files to on-demand generated pages as we'll see later in this post.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/static-diagram.png?alt=media&token=870098f1-ff0c-46fa-9459-ff8d17b49582" alt="server-client diagram" width="870" height="280" />

In this model, the server receives a request from the client, retrieves a copy of the requested page, and replies with a response containing the page content, status code, headers, and resources, such as images, icons, and fonts.

One of the most important benefits of static pages is that can be easily **cached** and **delivered** by fast CDNs to provide resilient and low-latency content to your end-users. You can think of a CDN as a distributed network of computers in charge of delivering content next to the user’s geolocation.

<blockquote>

<details>
  <summary>
    <strong><i>What is the difference between a CDN and Edge?</i></strong>
  </summary>

  Both terms can sound similar as both CDN and Edge can run globally and deal with high volumes of traffic,
  but generally speaking when we say something is "at the edge" or deployed at the edge we talking about the architecture pattern of edge computing.

  In **edge computing**, we can run long tasks/functions in a distributed network close to the user to provide personalized experiences quickly.

  <br />

  AWS, Netlify and Vercel cloud providers are some examples.
</details>

</blockquote>

### SSG

SSG stands for _Static Site Generation_ and is a rendering pattern used to **pre-render** web pages at **build time**.

Ok, let's break those fancy terms down:
- _pre-render_ :
  - Pre-rendering refers to the process of generating HTML pages ahead of time before they are ever sent to the users. It usually happens during the build phase of your app.
- _build time_ :
  - Build time is when you're _compiling_ the artifacts of your web application. During this phase, you can perform tasks such as data fetching,  transforming, or bundling files.
  - This step is usually triggered by a `npm run build` command.

When we say to **pre-render** it means that by the time a request comes, we only need to serve the pre-baked page generating everything again and again.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/SSG.png?alt=media&token=0ffb7caf-cbca-4243-a821-9953ba5eda0f" alt="diagram explaining the ssg build process" width="870" height="500" fit="contain" />

The nicest thing is you can run any arbitrary code when generating those pages, including performing database queries, getting content from a CMS, calling external resources, etc.

By default the number of generated HTML pages generated at build time will depend on how many pages you have stored on your app, it can be the products you're listing,
posts you've written, etc. Usually, the framework you're using will give you the option to dictate which pages need to be generated ahead of time, for example,
the `generateStaticParams` (or `getStaticPaths`) in Next.js.

The SSG pattern became the preferred choice for **content-based** apps such as **Blogs**, **Docs**, or **Landing pages** due to its simplicity, solid performance, and security. Being able to achieve good metrics in web vitals, most notably <abbr title="First Contentful Paint">FCP</abbr> and <abbr title="Time to Interactive">TTI</abbr>.

It is also one of my favorites ✨

[11ty](https://www.11ty.dev/), [Jekyll](https://jekyllrb.com/docs/), [Hugo](https://gohugo.io/) and [Astro](https://astro.build/) are some examples or static site generators.


## Dynamic

<i>"A dynamic website is one where some of the response content is generated dynamically, only when needed."</i> - [MDN Docs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction#dynamic_sites)

Essentially, dynamic pages are generated for each time they are requested. Dynamic sites can return highly personalized content based on user preferences and data.

The code you write to support dynamic websites must run on servers, mostly known as “server-side rendering” and it is very popular amongst frameworks like Ruby on Rails, Laravel, .NET, and Django.

### SSR

SSR or _Server-side rendering_ is the technique used to dynamically render a full page on every request on the server. You can use it to perform backend operations like data-fetching, querying a Database, and templating based on the HTTP request received and its headers, cookies or query params associated.

It's a suitable pattern for building recommendation feeds, social media, or authentication-based pages.

The major difference between SSR and Client-side Rendering (or CSR) is that running code on the server can achieve better performance and SEO as we don't need
**don't rely solely on JS** to be parsed and executed before the user can see the page. Some notable performance metrics that achieve good values by SSR are FCP as well as <abbr title="Largest Contentful Paint">LCP</abbr>.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/SSR.png?alt=media&token=59577dd5-4787-4f86-af6a-7cea3df65496" alt="diagram explaining the ssr request-response cycle" width="870" height="300" fit="contain" />

> It is important to note that although I have the power to run code server-side, I can't be careless about unoptimized or insecure code that could lead to errors and delay the response
of our users too much.

<i>What if I need my dynamic page also have interactivity on the client-side?</i>

To be able to render our interactive UI based on server code, in the end, we need some JavaScript to mount the components in the generated HTML file.

For example, in React this can be done by using the `renderToString` method.

```tsx
// server.ts
import { renderToString } from 'react-dom/server';

router.get("/", (req, res) => {
  const app = renderToString(<App />);
  return res.send(`<div id="root">${app}</div>`);
});
```

Then, to make the page interactive on the client-side we run the hydration process with:

```tsx
// client.tsx
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(document.getElementById('root'), <App />);
```

So, when I get the page with all my special details from the server, everything nice and pretty, I hydrate it to be able to
get interactive events, such as clicking on a button, scrolling, resizing and those actions connect with the page.

### What is a hydration process 🫗

A hydration process is when we take a **dry** previously rendered HTML page on the server
and **hydrate** by attaching event handlers for interactivity.

In the React example, this is done by attaching the **React application** to the root DOM node and hydrating node by node with JavaScript. That also means that these event handlers only get attached when the necessary JS bundle has been loaded and executed, so it can take a while to be fully interactive.

Obviously, we don't have to do such complex and error-prone task by hand nowadays. Most decent frameworks that are built upon this can handle most cases, and, if not, they can provide documentation
for common issues, such as [hydration mismatches](https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content).

---

## Caching

Caching plays a critical role in Web Rendering, which can have a high or low impact depending on your implementation strategy and needs.

Before heading to the next rendering pattern, I would like you to take a sip of water and go with me to understand first how caching works in the browser! 😉

### Cache-control

Cache-control is one of the most common HTTP headers used to manage caching in network requests in a very granular and flexible way.

```sh
Cache-Control: public, max-age=300
```

`max-age` controls **how long** can it be cached in seconds relative to the time of the request.

`public` is a directive to tell the browser that the resource can be cached by anyone, CDNs, third-party servers, etc.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/maxage.png?alt=media&token=df4fbdfa-dccc-4ef9-bd72-0442b41dd8c8" alt="max-age example as 5 min battery" width="870" height="280" fit="contain" />

As if each resource or file labeled with the `max-age` had a battery life that each incoming request will result in the same "charged" file as long
as the battery don't dry, which in case that happens the next request fetches the full asset instead of using the cache.

<br />

```sh
Cache-Control: no-store
```

`no-store` is a directive to tell the browser to **never** cache the file of that resource, so no battery whatsoever. Useful, for example, when we have a page with sensitive or time-based data.

<br />

```sh
Cache-Control: no-cache
```

`no-cache` is used to dynamically serve a file by revalidating with the server, if new content is available, the browser serve that new file received, otherwise, it returns the existing cached version.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/nocache.png?alt=media&token=f96943ce-9985-4955-b4e8-7aebe0e75340" alt="diagram battery representing no-cache revalidation" width="870" height="280" fit="contain" />

```sh
Cache-Control: private, max-age=60
```

`private` tells the browser to only keep a copy of that file/response on the client side and prevent the same response from being cached
by external servers.

### Stale-while-revalidate

**SWR** or state-while-revalidate is a cache invalidation mechanism for re-generating pages.

`stale-while-revalidate` is a Cache-Control directive for non-critical resources by keeping a stale response while the server
regenerates the page for updates.

```sh
Cache-Control: max-age=300, stale-while-revalidate=60
```

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/swr.png?alt=media&token=8d855734-16b0-400d-b89b-10ef4228e93b" width="870" height="280" fit="contain" />

In the above example, we tell the browser that the specific resource/file will stay in cache for 5 minutes, and once the user requests that same URL **after** this time, the browser will kick the revalidation process for 1 more minute (60 sec) so the server can regenerate a new page for the subsequent requests.

So we're saying that the file can be *stale* for 1 minute before being served with fresh content.

---

Now that you have a good grasp of how to do caching of network requests, let's proceed to the next pattern.

### ISR

Remember the first example I showed you about SSG where you could generate N pages during build time? Yeah?

Well, it is not a
complete solution, as you might imagined if we're dealing with outdated content that needs frequent updates and bulk of hundred of pages for your site, SSG itself might have some issues it can't solve itself.

Enter the room ISR.

ISR or _Incremental Site Regeneration_ is an increment over Static Site Generation (SSG) to solve issues of having **frequent updates** on static content by implementing different _caching strategies_.

ISR aims to provide a balance between static and fresh content by updating or rendering new pages even after a deploy has been done. If a user requests a new page that wasn't previously rendered, the server can generate it at the time.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/isr.png?alt=media&token=584ca029-3c98-4c64-88ef-bb729f3a7746" alt="diagram showing the request-response cycle of ISR" width="870" height="410" fit="contain" />

1. The user makes a request
   - If is under the revalidation time, then the server responds with same cached file
2. The user makes a second request, past the revalidation time.
   - The browser tells the server to re-generate that file
   - Revalidate the cache
3. The user makes a 3rd request
   - The browser receive the new fresh content from the server and serve that ✨

The revalidation process can either be triggered _time-based_ (using max-age) as we saw previously in caching or _on-demand_ by a function triggered on backend.

One page is generated at a time. The fallback of ISR can be a loading page or 404 page for when we're waiting the generation process or it can be the previously generated page in case regeneration fails.

This can be very suitable when you have a large-scale project with hundreds of pages, say we want to update a link or a typo in 1 of 100 published blog posts, we don't need to pre-render all of them, but only the ones that the user can access more quickly.

This can optimize **time** and cloud computing **costs** by only pre-rendering a subset of pages.

## Island Architecture

Island architecture or component island is a concept of having small focused *islands of interactivity* delivered on top of static pages to reduce the amount of JS code you send to the client while still being interactive.

The island Architecture was popularized by the Framework [Astro](https://docs.astro.build/en/concepts/islands/), which they call **Astro islands**.

An island is essentially any interactive component on the page. It is a progressive enhancement over static content.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/islands-arch.png?alt=media&token=073f3c0b-2c4a-40ea-b828-57ed65941bc0" width="870" height="500" fit="contain" />

Islands run in isolation and can share state with others. For instance, if you had a newsletter component and a subscribers count component as islands, they could operate independently while still communicating with each other as needed.

This idea results in great performance improvements because it eliminates the need to wait for the entire application to be hydrated before it becomes usable. Instead, only the specific interactive components, or islands, are loaded, which reduces the amount of JavaScript sent to the client.

This not only speeds up the initial load time but also enhances the overall user experience by making the interactive parts of the application responsive more quickly.

You can read more about the Islands Architecture in [this post](https://jasonformat.com/islands-architecture/).

## Streaming SSR

One issue with SSR these days is it doesn't let components "wait for data." With the current setup, when you're ready to render to HTML, you need to have all the data prepped for your components on the server. So, you end up gathering all the data on the server before you can even start sending any HTML to the client. It's pretty inefficient.

Streaming Server-side rendering is a rendering pattern unlocked by `renderToPipeableStream` to _stream certain parts of your UI_ directly from the server to the client
as the page is being loaded.

If you know <i>Node ReadableStreams</i>, this should look familiar to you.

`renderToPipeableStream` makes it possible for the app to start loading and processing this information as it’s still receiving the chunks of data from the App component!

As the name suggests, streaming implies chunks of HTML are streamed from the node server to the client as they are generated. As the client starts receiving “bytes” of HTML in the client soon after rendering starts on the server, the TTFB is reduced and relatively constant.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/streamingssr.png?alt=media&token=ce8ceb1c-f729-463a-a3b4-15263c34faab" width="870" height="500" fit="contain" />


It is also more consistent irrespective of the page size. Since the client can start parsing HTML as soon as it receives it, the FP and FCP are also lower.

```js
import { renderToPipeableStream } from 'react-dom/server';

renderToPipeableStream(<App />)
```

The client receiving this stream can subsequently call `ReactDOM.hydrate()` to hydrate the page and make it interactive.

For instance, in Next.js, you can create _Suspense Boundaries_ to wrap components that will progressively sent from the server to the client.

This allow us to handle complex components that don't need to be rendered immediately with high priority components. Individual components can also show custom loading states as the page is streamed and constructed by the browser.

```tsx
export default function NewsFeed() {
  <>
    <Suspense fallback={<Spinner />}>
      <OlympicResults />
    </Suspense>
    <Suspense fallback={<Spinner />}>
      <Weather />
    </Suspense>
  </>
}
```

With this pattern you can get the benefits of:

- Fast TTFB (Time to First Byte): The browser streams the HTML page shell without blocking the server-side data fetch.
- Progressive hydration: As server-side data fetches are resolved, the data is streamed within the HTML response. The React runtime progressively hydrates the state of each component, all without extra client round trips or blocking on rendering the full component tree.

Frameworks that implement this pattern are: [Next.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense) and [Remix](https://remix.run/docs/en/main/guides/streaming)

## Server Components

So, a couple years ago, the React Team introduced the concept of [React Server Components](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md) (or RSCs for short).

React Server Components are components that run exclusively on the server. They allow direct access to external resources, such as SQL databases, the filesystem, and third-party APIs, and use expensive dependencies without needing to send more JavaScript to the client.

It can be as simple as performing data-fetching or a query inside an asynchronous component:

```tsx
async function BlogPost() {
  const post = await db.posts.get(slug) // some ORM

  return (
    <article>
      <h2>{post.title}</h2>
      <p>...</p>
      <p>...</p>
    </article>
  )
}
```

This removes the complexity involved in the constant back-and-forth communication between the client and server, making the interaction more streamlined and efficient.

However, it does bring some intrinsic breaking changes you should be aware of... In fact, Server Components themselves have interesting peculiarities that I can’t cover entirely in this post, so I’ll try to focus on one of the pain points.

### Client vs Server components

When writing a server component you're limited to running things on the server, and no having access to the browser APIs or React client features such as: reactive state, context API or built-in hooks.

Besides, you also need to think about distinguish about server and "regular" components or _Client components_ when writing code that contains RSC.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/RSCs.png?alt=media&token=9cef035c-80d5-4354-b79f-04546ad00dff" width="870" height="500" fit="contain" />

Client components are the denoted by the `'use client'` declaration at the top of the file.

```jsx {1}
'use client'
function PostReactions() {
  const [reaction, setReaction] = useState(null)

  const handleClick = (reaction) => setReaction(reaction)

  return (
    <div>
      <button type="button" onClick={() => handleClick('👍')}>👍</button>
      <button type="button" onClick={() => handleClick('👎')}>👎</button>
    </div>
  )
}
```

RSCs can interop with client components by, for example, having one parent component be a server component and a child being a client component with the 'use client'. But surprisingly enough, this is **not** the case in the **opposite direction**, client components need to run on the client as well, so having server code inside them wouldn't work out.

That means you need to stop and think a little bit how would organize your application to attend both usages.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/components-interop.png?alt=media&token=f1b17b0c-d1d2-44a4-9085-5fb8aca369d8" alt="server and client components in the tree" width="870" height="500" fit="contain" />

## Partial Prerendering

In the first sections of this post, I talked about having Static and Dynamic content, but what if we had both?

Partial Prerendering (PPR) is fairly new rendering pattern introduced in Next 14 to **combine both static and dynamic rendering** on the same page.

Let’s say you have an e-commerce website, you can have a product catalog as a static, and a shopping cart as a dynamic part of your UI, so you get the best of both worlds.

Partial Prerendering is powered by Suspense boundaries in React. When the initial HTML is loaded as static content the user will see a Suspense fallback element for the dynamic UI elements while they’re rendering.

```tsx
export const experimental_ppr = true;

export default function CommerceShell() {
  <main>
    <header>
      <Suspense fallback={<CartSkeleton />}>
        <ShoppingCart />
      </Suspense>
    </header>
    <ProductsCatalog />
  </main>
}
```

Yep, it works similarly to streaming SSR where we provide a fallback and let the dynamic content be streamed to the page as it’s ready, but also prerender all static content and access quickly on the first load.

It is quite an experimental feature, and only available in Next.js at the time of this writing.

## Wrapping up

Phew… that was quite a lot, wasn’t it?

The moral of the story is that each pattern can solve a particular use case. Each one has its pros and cons, being some for well-suited for dynamic content or for static component, or maybe both.

Moreover, the landscape of web rendering is constantly evolving. New patterns and techniques are being developed to address emerging challenges and opportunities.

Thanks for reading!
