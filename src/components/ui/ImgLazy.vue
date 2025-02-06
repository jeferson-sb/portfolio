<template>
  <img loading="lazy" :data-src="src" :data-srcset="srcset" :alt="alt" :class="classes" :width="width" :height="height"
    :style="`--fallback-bg: ${bgColor};`" />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  srcset: {
    type: String,
    default: null,
  },
  alt: {
    type: String,
    default: '',
  },
  fullbleed: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: 'auto'
  },
  height: {
    type: String,
    default: 'auto',
  },
  bgColor: {
    type: String,
    default: 'hsl(214, 9%, 55%)',
  },
  fit: {
    type: String,
    default: 'contain',
  },
})

const classes = computed(() => ({
  lozad: true,
  'fullbleed': props.fullbleed,
  contain: props.fit === 'contain',
  cover: props.fit === 'cover',
}))
</script>

<style scoped>
.cover {
  object-fit: cover;
}

.wide-aspect-ratio {
  aspect-ratio: 16/9;
}

.low-aspect-ratio {
  aspect-ratio: 4/3;
}

.contain {
  width: auto;
  margin-inline: auto;
  object-fit: contain;
}

img:not([data-loaded="true"]) {
  background-color: var(--fallback-bg);
}

@media (--vw-md) {
  .lozad {
    height: auto;
  }
}
</style>
