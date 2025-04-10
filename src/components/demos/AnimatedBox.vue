<template>
  <div class="wrapper">
    <span class="box"></span>
  </div>
</template>

<script setup>
const props = defineProps({
  transition: {
    type: String,
    required: true,
  },
  transform: {
    type: String,
    default: 'unset',
  },
  delay: {
    type: Number,
    default: 0,
  },
  origin: {
    type: String,
    default: 'initial'
  },
  initialTransform: {
    type: String,
    default: 'revert'
  },
  activeTransform: {
    type: String,
    default: 'revert'
  }
})
</script>

<style scoped>
.wrapper {
  --hsl: 30, 50%, 50%;
  --w: 60px;
  --h: 60px;
  --backface: unset;

  perspective: var(--perspective);
  width: var(--w);
  height: var(--h);
  outline: 1px dotted var(--outline-color, transparent);
  outline-offset: 1px;
  margin-block: 2rem;
}

.box {
  --transition: v-bind(transition);
  --transform: v-bind(transform);
  --initial-transform: v-bind(initialTransform);
  --active-transform: v-bind(activeTransform);
  --delay: v-bind(delay);
  --origin: v-bind(origin);

  display: block;
  background-color: hsl(var(--hsl));
  backface-visibility: var(--backface);
  border-radius: var(--radius-default);
  width: var(--w);
  height: var(--h);
  transition: var(--transition);
  transition-delay: calc(var(--delay) * 1ms);
  transform: var(--initial-transform);
  transform-origin: var(--origin);
  will-change: transform;
}

.box:hover {
  transform: var(--transform);
}

.box:active {
  transform: var(--active-transform);
}

.wrapper.animated:hover .box {
  transform: var(--parent-transform);
}
</style>
