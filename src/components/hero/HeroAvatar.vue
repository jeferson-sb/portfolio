<template>
  <div class="hero-avatar">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
    },
    alt: {
      type: String,
      default: "user's picture",
    },
  },
}
</script>

<style scoped>
.hero-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 323px;
  height: 275px;
  background-color: var(--bg-color-primary-lighter, var(--color-black-800));
  border-radius: var(--radius-default);
  box-shadow: 1px 4px 4px 3px rgba(0, 0, 0, 0.14);
}

.hero-avatar .hero-avatar__image {
  clip-path: circle(70px at center);
}

body[data-theme='light'] .hero-avatar {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
}
</style>
