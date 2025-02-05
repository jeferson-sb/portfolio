<template>
  <div :class="{ box: true, unsupported: !supported }">
    <span v-if="!supported">Unsupported by your browser</span>
  </div>
  <span>{{ color }}</span>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "100",
  },
})

const supported = window.CSS.supports('background', props.color)
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

.box.unsupported {
  padding: 1rem;
  background: hsl(0deg 0% 26%);
}

span {
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  padding-block: 0.25rem;
  margin-block-end: 1rem;
}
</style>
