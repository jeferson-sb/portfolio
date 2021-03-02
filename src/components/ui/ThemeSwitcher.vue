<template>
  <button
    class="theme-switcher"
    @click="toggleTheme"
    aria-label="Switch theme between light and dark"
  >
    <template v-if="variant === 'fade'">
      <transition name="fade">
        <LampOnSVG v-if="current === 'light'" />
      </transition>
      <transition name="fade">
        <LampOffSVG v-if="current === 'dark'" />
      </transition>
    </template>
    <LampOnSVG v-if="variant === 'transform'" :class="svgClass" />
  </button>
</template>

<script>
import LampOnSVG from '@/assets/svg/lamp-on.svg'
import LampOffSVG from '@/assets/svg/lamp-off.svg'

export default {
  components: {
    LampOnSVG,
    LampOffSVG,
  },
  props: {
    variant: {
      type: String,
      default: 'fade',
    },
  },
  data() {
    return {
      themes: ['light', 'dark'],
      current: 'dark',
    }
  },
  mounted() {
    this.current =
      document.body.getAttribute('data-theme') ||
      localStorage.getItem('selected-theme')
  },
  computed: {
    svgClass() {
      const theme = this.current === 'light' ? 'on' : 'off'
      return `animated ${theme}`
    },
  },
  methods: {
    toggleTheme() {
      const currentIndex = this.themes.indexOf(this.current) + 1
      const nextIndex = currentIndex % this.themes.length
      this.current = this.themes[nextIndex]
      localStorage.setItem('selected-theme', this.current)
      document.body.setAttribute('data-theme', this.current)
    },
  },
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.animated path {
  transition: all 300ms ease-in-out;
}

.on .lamp-on-line {
  opacity: 0;
  animation: turn-on-lines 300ms ease-in-out forwards;
}

.on .lamp-on-line-1 {
  animation-delay: 150ms;
}

.on .lamp-on-line-2 {
  animation-delay: 50ms;
}

.on .lamp-on-line-3 {
  animation-delay: 300ms;
}

.off .lamp-on-line {
  animation: turn-off-lines 300ms ease-in-out forwards;
}

.off .lamp-on-line-1 {
  animation-delay: 150ms;
}

.off .lamp-on-line-2 {
  animation-delay: 300ms;
}

.off .lamp-on-line-3 {
  animation-delay: 50ms;
}

.off .lamp-on-holder {
  fill: var(--color-gray-800);
}

.off .lamp-on-shadow,
.off .lamp-on-cable,
.off .lamp-on-base {
  fill: var(--color-default-black);
}

.off .lamp-on-bulb {
  animation: turn-off-bulb 800ms ease-in-out forwards;
}

@keyframes turn-off-lines {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}

@keyframes turn-on-lines {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

@keyframes turn-off-bulb {
  from {
    fill: #fec165;
  }

  to {
    fill: #e0e0e0;
  }
}
</style>
