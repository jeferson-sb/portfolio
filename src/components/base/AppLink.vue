<template>
  <a
    v-if="isExternal"
    :href="to"
    v-bind="$attrs"
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
defineProps({
  to: String,
  isExternal: {
    type: Boolean,
    default: false,
  },
})
</script>
