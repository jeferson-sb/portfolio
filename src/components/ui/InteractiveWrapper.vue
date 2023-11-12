<template>
  <div :class="classes">
    <span>{{ title }}</span>
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Interactive Example',
  },
  borderless: {
    type: Boolean,
  },
  resizable: {
    type: Boolean,
  },
})

const classes = computed(() => ({
  'interactive-wrapper': true,
  'interactive-wrapper--borderless': props.borderless,
}))
</script>

<style scoped>
.interactive-wrapper {
  border: 1px solid var(--color-silver);
  padding: 0.7rem;
  margin: 1rem 0;
  border-radius: var(--radius-default);
  position: relative;
}

.interactive-wrapper span {
  text-transform: uppercase;
  color: var(--color-silver);
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  font-weight: var(--fw-bold);
  background: var(--color-light, var(--color-default-black));
  position: absolute;
  top: -10px;
  padding: 0 10px;
}
</style>
