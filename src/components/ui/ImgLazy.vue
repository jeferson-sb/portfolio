<template>
  <img
    loading="lazy"
    :data-src="src"
    :data-srcset="srcset"
    :alt="alt"
    :class="styles"
    :width="width"
    :height="height"
    :style="`background-color: ${bgColor};`"
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
    fullBleed: {
      type: Boolean,
      default: false,
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
    fit: {
      type: String,
      default: 'cover',
    },
  },
  computed: {
    styles() {
      return {
        lozad: true,
        'full-bleed': this.fullBleed,
        contain: this.fit === 'contain',
        cover: this.fit === 'cover',
      }
    },
  },
}
</script>

<style scoped>
.cover {
  object-fit: cover;
}

.contain {
  width: auto;
  margin-left: auto;
  margin-right: auto;
  object-fit: contain;
}

@media screen and (max-width: 768px) {
  .lozad {
    height: auto;
  }
}
</style>
