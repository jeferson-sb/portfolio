<template>
  <nav class="mobile-navbar is-mobile-only" id="mobile-menu">
    <ul class="mobile-navbar-menu">
      <slot></slot>
    </ul>
  </nav>
</template>

<style>
.mobile-navbar {
  background-color: hsl(220deg 13% 12% / 92%);
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: 80px;
  visibility: hidden;
  overflow-y: auto;
}

.mobile-navbar::before {
  --position3d: -50%, 50%, 0;
  --scale3d: 0, 0, 0;

  content: '';
  z-index: -1;
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

.mobile-navbar--opened {
  visibility: visible;
}

.mobile-navbar--opened::before {
  --position3d: -50%, 50%, 0;
  --scale3d: 13, 13, 13;
}

.mobile-navbar .mobile-navbar-menu {
  padding: 0 2rem;
}

.mobile-navbar .navbar-menu__item {
  font-size: 2rem;
  font-weight: 700;
  margin: 4rem 0;
  transform: translateX(-100px);
  opacity: 0;
  will-change: transform;
}

.mobile-navbar .navbar-menu__item .navbar-menu__link {
  color: var(--color-gray-300);
}

.mobile-navbar .navbar-menu__item:hover .navbar-menu__link,
.mobile-navbar .navbar-menu__item:active .navbar-menu__link {
  color: var(--color-accent);
}

.mobile-navbar--opened .navbar-menu__item {
  animation: fadeIn 400ms ease-in forwards;
}

@keyframes fadeIn {
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
