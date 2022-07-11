<template>
  <a
    v-if="isExternal"
    :href="to"
    v-bind="$attrs"
    :class="classes"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
  <router-link v-else v-bind="$props">
    <slot />
  </router-link>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

const props = defineProps({
  to: String,
  isExternal: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'default',
  },
  size: {
    type: String,
    default: 'normal',
  },
  full: {
    type: Boolean,
  },
})

const classes = reactive({
  'link--button': props.variant === 'button',
  'link--full': props.full,
})
</script>

<style scoped>
.link--button {
  --button-bg-color: var(--color-primary);
  --button-text-color: var(--color-default-black);
  --button-fw: 700;
  --button-radius: var(--radius-default);

  display: inline-block;
  text-align: center;
  padding: 0.5rem 1rem;
  max-width: fit-content;
  color: var(--button-text-color);
  background-color: var(--button-bg-color);
  font-weight: var(--button-fw);
  font-size: var(--button-font-size, inherit);
  transition: filter 0.3s ease-in-out;
  border-radius: var(--button-radius);
}

.link--button:hover {
  text-decoration: none;
  filter: brightness(70%);
}

.link--button:focus {
  outline: 0;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 0.19rem var(--button-shadow-color);
}

.link--full {
  width: 100%;
  max-width: 100%;
}
</style>
