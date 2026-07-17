<template>
  <div class="hero-avatar">
    <picture class="hero-avatar__image">
      <slot />
    </picture>
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "user's picture",
  },
})
</script>

<style>
.hero-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 210px;
  position: relative;
}

.hero-avatar__image {
  position: relative;

  & img {
    clip-path: circle(70px at center);
    object-fit: cover;
  }

  &::before {
    --avatar-outline-color: var(--color-silver);

    content: '';
    position: absolute;
    display: block;
    width: 150px;
    height: 150px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    outline: 4px inset var(--avatar-outline-color);
    border-radius: 9999px;
    animation: rotate-outline 20s linear infinite normal both;
    will-change: transform;
  }
}

@keyframes rotate-outline {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

[data-theme='light'] {
  .hero-avatar {
    box-shadow: var(--elevation-3);

    & picture::before {
      --avatar-outline-color: var(--color-primary);
    }
  }
}
</style>
