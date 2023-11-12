<template>
  <AppLink :to="href" class="tag-link" v-if="linkable"><span :class="styles">{{ tagName }}</span></AppLink>
  <span :class="styles" v-else>{{ tagName }}</span>
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
  linkable: {
    type: Boolean,
    default: false
  }
})

const styles = {
  tag: true,
  'tag--accent': props.variant,
}

const href = props.linkable ? `/tags/${props.tagName.trim()}` : ''
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

.tag-link {
  text-decoration: none;
  color: inherit;
  transition: opacity 400ms ease-out;

  &:hover {
    opacity: 0.6;
  }
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
