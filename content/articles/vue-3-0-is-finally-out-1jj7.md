---
id: 461326
title: Vue 3.0 is finally out!
slug: vue-3-0-is-finally-out-1jj7
published_at: 2020-09-20T20:36:15.500Z
tags: vue,javascript,webdev,tutorial
excerpt: Vue 3.0 has landed, in this post we'll go through some of the exciting new features he brings us and learn how to get started with Vue 3.
crosspostedOn: Dev.to
crosspostLink: https://dev.to/jeferson_sb/vue-3-0-is-finally-out-1jj7
url: https://dev.to/jeferson_sb/vue-3-0-is-finally-out-1jj7
path: /articles/vue-3-0-is-finally-out-1jj7
canonicalUrl: https://dev.to/jeferson_sb/vue-3-0-is-finally-out-1jj7
cover_image: https://res.cloudinary.com/practicaldev/image/fetch/s--rPczvTck--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/tfrvwtetqrzwyp573kwb.png
---

The new major version of Vue is here! after 2 years of development one of the most popular JavaScript frameworks is full of new capabilities and much more approachable for large applications.

We will go through some of the exciting new features and see how the new release will affect the way you write Vue Apps.

## Table of contents

- [Table of contents](#table-of-contents)
- [Breaking changes](#breaking-changes)
- [How to Create a new Vue 3 App](#how-to-create-a-new-vue-3-app)
- [New Global API](#new-global-api)
- [New Features](#new-features)
  - [Composition API](#composition-api)
  - [Benefits:](#benefits)
  - [Better TypeScript support](#better-typescript-support)
  - [Suspense](#suspense)
  - [Teleport](#teleport)
  - [Fragments](#fragments)
- [Further reading](#further-reading)

## Breaking changes

- Vue 3 has a new Global API, now we use `createApp` instead of `new Vue({})`;
- No more support for **Filters**, you should use **computed proprieties** or methods instead;
- $on, $off, and $once methods are removed, you might have used them in the past alongside an `eventBus`;
- `data` option should always be declared as a function;
- `defineAsyncComponent` is the new method used to import and deal with async components;
- Vue's Reactivity system is now based on ES2015 Proxies;

## How to Create a new Vue 3 App

The most simple way is to just plug in a cdn script tag:

```html
<html>
  <body>
    <div id="app">
      <p>{{ message }}</p>
    </div>
    <script src="https://unpkg.com/vue@next"></script>
    <script>
      const app = Vue.createApp({
        data() {
          return {
            message: 'I love Vue <3',
          }
        },
      })
      app.mount('#app')
    </script>
  </body>
</html>
```

You can start creating a fresh new Vue 3 App today quickly with the @vue/cli@4.5.0 to take advantage of a toon of integrations that Vue CLI provides out-of-the-box.

![vue-cli](https://dev-to-uploads.s3.amazonaws.com/i/1eu1kszx8zfii1kf3lee.gif)

Alternatively, you can also use **Vite**, a blazing fast build tool for modern JavaScript Projects, it uses Browser Native ES Modules during development combined with Hot Module Replacement, with this approach your development server does not need to bundle all the files at once, but instead, it bundles only files you actually use at the time, which makes it also starts really fast and cold.

```bash
$ npm init @vitejs/app hello-vue3 --template vue
$ cd hello-vue3
$ npm i && npm run dev
```

You can learn more about Vite [here](https://vitejs.dev/).

## New Global API

Previously in Vue 2.x apps, you would use `new Vue()` to create a root instance and pass a series of options.
Now with Vue 3.x, we have a new Global API for creating an app instance.

The idea is to place everything that mutates Vue's behavior at the level of the app instance.

```js
import { createApp } from 'vue'
import App from './App.vue'

// Create a Vue instance or app
const app = createApp(App)

app.use(/* vue router, vuex, ... */)
app.component(/* some global component... */)
app.directive(/* some custom directive... */)

app.mount('#app')
```

As you can see every configuration is scoped to a certain Vue application defined with `createApp`.

## New Features

### Composition API

This is definitely one of the game-changing ones, In fact, Composition API itself deserves a whole article about it, I'll do a quick overview of what it is and how it works.

You may be used to define a new component as an object with a set of options like data, methods, computed, and so on which is perfectly fine for small components, however as your app grows you end up creating complex and large components. Typically in these situations, we create Mixins to extract the common logic to be able to share with other components, which works in some cases but is not very flexible.

### How composition works

Composition API allows us to **reuse logic between components creating** <em> composable functions</em>, so instead of having your logic split up in multiple component options, you can take advantage of composition functions to have your all your logic code in one place.

In short, with this approach, our components are less complex and much more maintainable.

```javascript
<template>
  ...
  <input
    type="search"
    v-model="searchInput"
    placeholder="Enter your favorite game..."
  />
  <button @click="fetchGame">
    Search
  </button>
  <ul v-if="games.results">
    <li v-for="game in games.results" :key="game.id">
      <GameCard :game="game" />
    </li>
  </ul>
  <p v-if="loading">Loading...</p>
  <p v-if="hasErrors">{{ hasErrors }}</p>
	...
</template>

import { ref, computed, onMounted, onUnmounted } from 'vue';
import GameCard from '../components/GameCard.vue';
import useFetch from '../composables/useFetch';

export default {
  components: {
    GameCard,
  },
  // Pretty much everything lives inside this setup function
  setup() {
    const searchInput = ref('');
    const { results, hasErrors, loading, execute } = useFetch();

    // Executed when computed is mounted, similiar to Vue 2.x mounted lifecycle hook
    onMounted(() => {
      execute(
        'https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added'
      );
    });

    function fetchGame() {
      execute(`https://api.rawg.io/api/games?search=${searchInput.value}`);
    }

    // anything that needs to be accessed in the template
    return {
      searchInput,
      games: results,
      loading,
      hasErrors,
      execute,
      fetchGame,
    };
  },
};
```

First off, we're importing our components, methods and declaring our setup function.

As you can see we're not using the `data()` option, in this case, we use a ref. A `ref` is a reactive reference that allows us to track changes in the template.

We're using a composable function called `useFetch` to handle requests, and last but not least, we return our state.

Our composable function:

```js
import { ref } from 'vue';

export default function useFetch {
  // reactive state
  const results = ref([]);
  const loading = ref(false);
  const hasErrors = ref(null);

  const execute = async url => {
    loading.value = true;

    try {
      const response = await fetch(url);
      const data = await response.json();
      results.value = data;
    } catch (err) {
      hasErrors.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { results, loading, hasErrors, execute };
}
```

You can view this complete example in [this repo](https://github.com/jeferson-sb/demo-vue3).

Another good example of Composition API implementation is to create an `IntersectionObserver` composition function to lazy load images or components, for instance:

```js
import { ref } from 'vue'

export default function useIntersectionObserver() {
  const isSupported = 'IntersectionObserver' in window
  const isIntersecting = ref(false)
  const isShown = ref(false)

  if (!isSupported) {
    console.log('Your browser does not support this feature yet.')
  }

  const observer = new IntersectionObserver((entries) => {
    const component = entries[0]

    if (component.isIntersecting && !isShown.value) {
      isIntersecting.value = true
      isShown.value = true
    } else {
      isIntersecting.value = false
    }
  })

  const observe = (element) => {
    observer.observe(element)
  }

  const unobserve = (element) => {
    observer.unobserve(element)
  }

  return { observe, unobserve, isIntersecting, isShown }
}
```

Now in our component, we import it like a regular function and use the methods to dynamically render the image.
(Pretty similar to creating a custom hook in the React world).

```html
<template>
  ...
  <div ref="el">
    <img :src="isShown ? game.background_image : null" />
  </div>
  ...
</template>

<script>
  import { ref, computed, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
  import useIntersectionObserver from '../composables/useIntersectionObserver'

  export default {
    props: {
      game: Object,
    },
    setup(props, context) {
      const el = ref(null)
      const { observe, unobserve, isIntersecting } = useIntersectionObserver()

      onMounted(() => {
        observe(el.value)
      })

      onBeforeUnmount(() => {
        unobserve(el.value)
      })

      return { el, isIntersecting }
    },
  }
</script>
```

### Benefits:

- Code can now be organized by <em>logical concerns</em> (or features)
- Keeps your components more readable
- Extremely flexible

Good news: You can also use Composition API with <em>Vue 2</em> through [@vue/composition api module](https://github.com/vuejs/composition-api)!

It's good to say this syntax (setup) is optional, therefore you don't need to use composition for every single component you build, the standard object syntax is still completely valid.d.

### Better TypeScript support

Vue 3 is completely written in TypeScript, which is good for everyone, now you can get better type definitions, develop more maintainable apps with typescript code, and, you can also get the _Intellisense_ and _Autocompletetion_ of your favorite code editor.

### Suspense

Suspense is a native Vue component to deal with async dependencies. It is a good option to control what should render until a condition is met and our async component is ready.

In addition, it is a better way to handle multiple API calls from different components than relying on a `v-if` loading condition.

> Note: Suspense is pretty experimental at this stage and its API might change in the future.

```html
<template>
  <Suspense>
    <template #default>
      <GameList />
      <!-- or Whatever async component you want to render -->
    </template>
    <template #fallback> Loading ... </template>
  </Suspense>
</template>
```

### Teleport

We can use Teleport to write components that can have to move/teleport into different parts of your application, by selecting where (DOM element) to place even if this place is not where your app is mounted.

![alt Goku teleport](https://media1.tenor.com/images/e81ce2586db0f6ab36c25f9f533ed8ac/tenor.gif?itemid=5155252)

> Teleport re-uses the DOM elements, so the state is preserved.

```html
<div id="app"></div>
<div id="move-to-here"></div>
  ...
<template>
  <teleport to="#move-to-here">This should live outside of #app</teleport>
</template>
```

And you can select the target element in many ways

```html
<teleport to="#id"></teleport>
<teleport to=".class"></teleport>
<teleport to="[data-modal]"></teleport>
```

Simple, but very powerful!

### Fragments

If you used React before you might know this one, in Vue 2.x we could not create a template with 2 elements at the same root and the reason for that is Vue instance that represents any Vue component needs to be bound into a single DOM element.

Now with Vue 3 you don't have to worry about that:

```html
<!-- Before -->

<template>
	<div>
		<div>...<div>
		<div>...</div>
	</div>
</template>

<!-- After -->

<template>
	<div>...<div>
	<div>...</div>
</template>
```

## Further reading

I'm very glad you reach until here and I hope you enjoyed reading 😊.

Here are some useful links to explore and learn more about Vue 3 🖖

- Example shown in this post → [https://github.com/jeferson-sb/demo-vue3](https://github.com/jeferson-sb/demo-vue3)

- Vue 3.0 current status → [https://github.com/vuejs/vue-next](https://github.com/vuejs/vue-next)

- Migration Guide → [https://v3.vuejs.org/guide/migration/introduction.html#overview](https://v3.vuejs.org/guide/migration/introduction.html#overview)

- Great collection of composable functions → [https://github.com/pikax/vue-composable](https://github.com/pikax/vue-composable)

- [Go async in Vue 3 with Suspense](https://vuedose.tips/go-async-in-vue-3-with-suspense/)

- [Easily switch to composition api in Vue 3](https://vuedose.tips/easily-switch-to-composition-api-in-vuejs-3/)

- [Exciting new features in Vue 3](https://vueschool.io/articles/vuejs-tutorials/exciting-new-features-in-vue-3/)
