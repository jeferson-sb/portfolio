<template>
  <span class="tag">{{ tagName }}</span>
</template>

<script>
export default {
  props: {
    tagName: {
      type: String,
    },
  },
}
</script>

<style scoped>
.tag {
  border-radius: 14px;
  background-color: var(--color-black-700);
  font-size: var(--text-xsm);
  opacity: 0.6;
  padding: 2px 10px;
}

body[data-theme='light'] .tag {
  background-color: hsla(225, 15%, 50%, 0.1);
}
</style>
