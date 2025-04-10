<template>
  <div class="tags">
    <Tag v-for="tag in tags" :key="tag" :tag-name="tag" :linkable="linkable" />
  </div>
</template>

<script setup>
defineProps({
  tags: {
    type: Array,
    required: true,
  },
  linkable: {
    type: Boolean
  }
})
</script>

<style scoped>
.tags {
  display: flex;
  flex-flow: row wrap;
  gap: 0.25rem;
}
</style>
