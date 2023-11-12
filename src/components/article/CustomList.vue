<script setup>
defineProps(['marker'])
</script>

<template>
  <div class="custom-list">
    <slot />
  </div>
</template>

<style>
.custom-list ul li {
  padding-inline-start: 0.4em;

  &::marker {
    content: v-bind(marker);
  }
}
</style>
