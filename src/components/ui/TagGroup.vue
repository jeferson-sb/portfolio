<template>
  <div class="tags">
    <Tag v-for="tag in tags" :key="tag" :tagName="tag" />
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
    },
  },
}
</script>

<style scoped>
.tags {
  display: flex;
  flex-flow: row wrap;
  gap: 0.25rem;
}
</style>
