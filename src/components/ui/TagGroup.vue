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
  margin: 6px 0;
}

.tags .tag:not(:last-child) {
  margin-right: 9px;
}
</style>
