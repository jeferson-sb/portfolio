<template functional>
  <img
    :data-src="props.src"
    :data-srcset="props.srcset"
    :alt="props.alt"
    :class="{ lozad: true, [props.className]: true }"
    :width="props.width"
    :height="props.height"
    :style="`background-color: ${props.bgColor};`"
  />
</template>

<script>
export default {
  name: 'ImageLazy',
  props: {
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
    className: {
      type: String,
      default: '',
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    bgColor: {
      type: String,
      default: 'hsl(214, 9%, 55%)',
    },
  },
}
</script>

<style scoped>
.lozad {
  object-fit: cover;
}

@media screen and (max-width: 768px) {
  .lozad {
    height: auto;
  }
}
</style>
