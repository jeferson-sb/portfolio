<template>
  <Button @click="ripple" class="button--ripple" v-bind="$attrs">
    <slot />
  </Button>
</template>

<script>
import Button from '@/components/ui/Button'

export default {
  components: {
    Button,
  },
  methods: {
    ripple(e) {
      const rect = e.target.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      this.$el.style.setProperty('--x', x)
      this.$el.style.setProperty('--y', y)
    },
  },
}
</script>

<style scoped>
.button--ripple {
  --y: 0;
  --x: 0;
  --shadow-color: 0, 0, 0;
  --button-font-size: var(--text-sm);

  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(var(--shadow-color), 0.12),
    0 1px 2px 0 rgba(var(--shadow-color), 0.24);
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

.button--ripple:focus {
  box-shadow: 0 3px 6px 0 rgba(var(--shadow-color), 0.15),
    0 3px 6px 0 rgba(var(--shadow-color), 0.23);
}

.button--ripple::before {
  content: '';
  position: absolute;
  background: rgba(var(--shadow-color), 0.25);
  border-radius: 50%;
  transform: scale(0);
  transform-origin: 50% 50%;
  top: calc(var(--y) * 1px);
  left: calc(var(--x) * 1px);
  width: 5px;
  height: 5px;
  opacity: 0;
}

.button--ripple:focus:not(:active)::before {
  animation: ripple 500ms ease-out;
}

.button--ripple:focus-visible {
  box-shadow: 0 0 0 0.19rem var(--button-shadow-color);
}

@keyframes ripple {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 1;
    transform: scale(20);
  }

  100% {
    transform: scale(40);
    opacity: 0;
  }
}
</style>
