<script setup>
defineProps(['marker'])
</script>

<template>
  <div class="custom-list">
    <slot />
  </div>
</template>

<style>
.custom-list ul li::marker {
  content: v-bind(marker);
}

.custom-list ul li {
  padding-inline-start: 0.4em;
}
</style>
