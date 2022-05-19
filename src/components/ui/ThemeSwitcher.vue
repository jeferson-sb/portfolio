<template>
  <button
    class="theme-switcher"
    @click="toggleTheme"
    aria-label="Switch theme between light and dark"
  >
    <template v-if="variant === 'fade'">
      <transition name="fade">
        <LampOnSVG v-if="current === 'light'" />
        <LampOffSVG v-else-if="current === 'dark'" />
      </transition>
    </template>
    <LampOnSVG v-if="variant === 'transform'" :class="svgClass" />
  </button>
</template>

<script setup>
import { ref, onMounted, computed, defineProps } from 'vue'

defineProps({
  variant: {
    type: String,
    default: 'fade',
  },
})

const themes = ['light', 'dark']
const current = ref('dark')

onMounted(() => {
  current.value =
    document.body.getAttribute('data-theme') ??
    localStorage.getItem('@jb/selected-theme')
})

const svgClass = computed(() => {
  const theme = current.value === 'light' ? 'on' : 'off'
  return `animated ${theme}`
})

const toggleTheme = () => {
  const currentIndex = themes.indexOf(current.value) + 1
  const nextIndex = currentIndex % themes.length
  current.value = themes[nextIndex]

  localStorage.setItem('@jb/selected-theme', current.value)

  document.body.setAttribute('data-theme', current.value)
}
</script>

<style scoped>
.theme-switcher {
  background: transparent;
  outline: 0;
}

.theme-switcher svg {
  margin-top: -5px;
  transform: scale(0.7);
  position: absolute;
  left: -10px;
  right: 0;
  top: -24px;
}

.theme-switcher:focus-visible svg {
  outline: 2px dashed var(--color-primary);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
