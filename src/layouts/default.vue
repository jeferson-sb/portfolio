<template>
  <SkipLink />
  <Navbar />
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
  <Footer />
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const storedTheme = localStorage.getItem('@jb/selected-theme')
  const setAttrValue = (el, attr, value) => el.setAttribute(attr, value)

  if (!storedTheme) {
    const { matches: preferDarkScheme } = window.matchMedia(
      '(prefers-color-scheme: dark)'
    )
    setAttrValue(
      document.body,
      'data-theme',
      preferDarkScheme ? 'dark' : 'light'
    )
  } else {
    setAttrValue(document.body, 'data-theme', storedTheme)
  }
})
</script>

<style>
body {
  background-color: var(--color-default-black);
  color: var(--color-default-white);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body[data-theme='light'] {
  --color-light: hsl(228, 33%, 97%);
  --text-color-default: var(--color-default-black);
  --secondary-text-color: var(--color-silver);
  --bg-color-primary-lighter: rgba(26, 187, 209, 0.3);
  --bg-color-lighter: hsl(0, 0%, 97%);
  --accent-color-lighter: hsl(225, 31%, 95%);
  --scrollbar-bg: var(--accent-color-lighter);
  --scrollbar-thumb-color: var(--color-gray-300);
  --scrollbar-border: var(--color-gray-300);

  background-color: var(--color-light);
  color: var(--color-default-black);
  transition-property: background-color, color;
  transition-duration: 500ms;
  transition-timing-function: ease-in-out;
}

body[data-theme='light'] footer,
body[data-theme='light'] header {
  border-color: rgba(108, 118, 147, 0.3) !important;
}

body[data-theme='dark'] img {
  filter: brightness(0.8);
}

body::-webkit-scrollbar {
  width: 1em;
}

body::-webkit-scrollbar-track {
  background-color: var(--scrollbar-bg);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--scrollbar-thumb-color);
  border: 3px solid var(--scrollbar-border);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
