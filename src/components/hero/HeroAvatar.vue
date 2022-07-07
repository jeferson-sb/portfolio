<template>
  <div class="hero-avatar">
    <picture class="hero-avatar__image">
      <slot />
    </picture>
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

<style>
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

.hero-avatar .hero-avatar__image img {
  clip-path: circle(70px at center);
  object-fit: cover;
}

.hero-avatar picture {
  position: relative;
}

.hero-avatar picture::before {
  --avatar-outline-color: var(--color-silver);

  content: '';
  position: absolute;
  display: block;
  width: 160px;
  height: 160px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
  outline: 8px inset var(--avatar-outline-color);
  border-radius: 9999px;
  animation: rotateOutline 20s linear infinite normal both;
  will-change: transform;
}

@keyframes rotateOutline {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

[data-theme='light'] .hero-avatar {
  box-shadow: var(--elevation-3);
}

[data-theme='light'] .hero-avatar picture::before {
  --avatar-outline-color: var(--color-primary);
}
</style>
