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
  background-color: var(--accent-color-lighter, var(--color-gray-800));
  border-radius: var(--radius-default);
  box-shadow: var(--elevation-2);
}

.hero-avatar .hero-avatar__image {
  clip-path: circle(70px at center);
}

body[data-theme='light'] .hero-avatar {
  box-shadow: var(--elevation-3);
}
</style>
