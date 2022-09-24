<template>
  <span :class="styles">{{ tagName }}</span>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  tagName: {
    type: String,
  },
  variant: {
    type: String,
    default: '',
  },
})

const styles = {
  tag: true,
  'tag--accent': props.variant,
}
</script>

<style scoped>
.tag {
  --_tag-bg: var(--color-gray-700);

  border-radius: 14px;
  background-color: var(--_tag-bg);
  font-size: var(--text-xsm);
  opacity: 1;
  padding: 2px 10px;
  margin: 0;
}

.tag--accent {
  color: var(--color-accent);
  text-shadow: 1px 1px 20px var(--color-accent);
  border: var(--border-width) var(--border-style) var(--color-accent);
  box-shadow: var(--elevation-1);
}

body[data-theme='light'] .tag {
  background-color: hsla(225, 15%, 50%, 0.1);
}
</style>
