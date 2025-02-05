<template>
  <nav id="mobile-menu" ref="mobileNavbar" class="mobile-navbar">
    <ul class="mobile-navbar-menu">
      <slot></slot>
    </ul>
    <button class="close" @click="$emit('close')">
      <svg
xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        role="presentation">
        <title>Close</title>
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['close'])

const mobileNavbar = ref(null)

onMounted(() => {
  document.addEventListener('click', e => {
    if (mobileNavbar?.value?.contains(e.target)) {
      emit('close')
    }
  })
})
</script>

<style>
.mobile-navbar {
  --bg: hsl(220deg 13% 12% / 92%);

  background-color: var(--bg);
  height: 100vh;
  height: 100dvh;
  position: fixed;
  top: 0;
  width: 100%;
  padding-block-start: 80px;
  visibility: hidden;
  overflow-y: auto;

  &::before {
    --position3d: -50%, 50%, 0;
    --scale3d: 0, 0, 0;

    content: '';
    z-index: var(--z-hide);
    position: absolute;
    bottom: 100%;
    left: 100%;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: var(--color-accent);
    transform-origin: center;
    transform: translate3d(var(--position3d)) scale3d(var(--scale3d));
    transition: transform 500ms ease-out;
  }

  & .close {
    all: unset;

    & svg {
      max-width: 48px;
      position: absolute;
      top: 20px;
      right: 20px;
      color: var(--color-gray-800);
    }
  }

  .navbar-menu__item {
    font-size: 2rem;
    font-weight: var(--fw-bold);
    margin: 4rem 0;
    transform: translateX(-100px);
    opacity: 0;
    will-change: transform;
  }

  .navbar-menu__link {
    color: var(--color-gray-300);
  }

  .navbar-menu__item:hover .navbar-menu__link,
  .navbar-menu__item:active .navbar-menu__link {
    color: var(--color-accent);
  }
}

@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .mobile-navbar {
    backdrop-filter: blur(4px);
  }
}

.mobile-navbar--opened {
  visibility: visible;

  &::before {
    --position3d: -50%, 50%, 0;
    --scale3d: 13, 13, 13;
  }

  & .navbar-menu__item {
    animation: fade-in 400ms ease-in forwards;
  }
}

.mobile-navbar-menu {
  padding: 0 2rem;
  list-style: none;
}

@media screen and (min-width: 64em) {
  .mobile-navbar {
    display: none;
  }
}

@keyframes fade-in {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
