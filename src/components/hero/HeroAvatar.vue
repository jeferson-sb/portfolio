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
  width: 323px;
  height: 275px;
  border-radius: var(--radius-default);
  box-shadow: var(--elevation-2);
  position: relative;
  background-color: var(--accent-color-lighter, var(--color-gray-800));
  background-clip: padding-box;

  &::before {
    background: linear-gradient(11deg, transparent 70%, var(--color-silver)), linear-gradient(190deg, transparent 70%, var(--color-silver));
    border-radius: inherit;
    content: "";
    margin: -1px;
    position: absolute;
    inset: 0;
    z-index: -1;
  }
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
    width: 160px;
    height: 160px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    outline: 8px inset var(--avatar-outline-color);
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
