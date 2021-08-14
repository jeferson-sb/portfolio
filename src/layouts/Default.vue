<template>
  <transition name="fade" appear>
    <div>
      <SkipLink />
      <Navbar />
      <slot />
      <Footer />
    </div>
  </transition>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import SkipLink from '@/components/ui/SkipLink.vue'

export default {
  components: {
    Navbar,
    Footer,
    SkipLink,
  },
  mounted() {
    const storedTheme = localStorage.getItem('selected-theme')
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
  },
}
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
  --color-light: #f5f6fa;
  --text-color-default: var(--color-default-black);
  --secondary-text-color: var(--color-silver);
  --bg-color-primary-lighter: rgba(26, 187, 209, 0.3);
  --bg-color-lighter: #f8f8f8;
  --accent-color-lighter: hsl(225, 31%, 95%);

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
  background-color: var(--color-gray-800);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--color-silver);
  border: 3px solid var(--color-gray-800);
}

.fade-enter-active {
  transition: opacity 600ms;
}

.fade-enter {
  opacity: 0;
}
</style>
