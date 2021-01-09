<template>
  <div class="tags">
    <Tag v-for="tag in tags" :key="tag" :tagName="tag" />
  </div>
</template>

<script>
import Tag from './Tag';

export default {
  components: {
    Tag
  },
  props: {
    tags: {
      type: Array,
    }
  },
}

</script>

<style scoped>
.tags {
  display: flex;
  margin: 10px 0;
}

.tag + .tag {
  margin-left: 9px;
}
</style>
