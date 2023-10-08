<template>
  <div class="box"></div>
  <span>{{ color }}</span>
</template>

<script setup>
defineProps({
  color: String,
  size: {
    type: Number,
    default: 100,
  },
})
</script>

<style scoped>
.box {
  --color: v-bind(color);
  --size: v-bind(size);

  display: block;
  background: var(--color);
  border-radius: var(--radius-default);
  width: calc(var(--size) * 1px);
  height: calc(var(--size) * 1px);
}

span {
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  padding-block: 0.25rem;
  margin-block-end: 1rem;
}
</style>
