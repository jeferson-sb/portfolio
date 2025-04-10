<template>
  <SkipLink />
  <Navbar />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
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
  &::-webkit-scrollbar {
    width: 1em;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--scrollbar-bg);
    box-shadow: inset 0 0 6px rgb(0 0 0 / 50%);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--scrollbar-thumb-color);
    border: 3px solid var(--scrollbar-border);
  }
}
</style>
