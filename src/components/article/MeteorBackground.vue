<template>
  <span class="meteor" v-for="i in 20" :key="'meteor' + i" :style="{
    top: '0px',
    left: Math.floor(Math.random() * 800 - 400) + 'px',
    animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
    animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's'
  }"></span>
  <slot></slot>
</template>

<style scoped>
.meteor {
  position: absolute;
  top: 50%;
  left: 50%;
  width: .125rem;
  height: .125rem;
  background: lch(48.34% 14.52 268.7);
  border-radius: var(--radius-full);
  box-shadow: 0 0 #0000,
    0 0 #0000,
    0 0 0 1px #ffffff10;
  transform: rotate(215deg);
  animation: meteor-effect 5s linear infinite;
}

.meteor::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translate(0, -50%) rotate(0);
  width: 50px;
  height: 1px;
  background: linear-gradient(to right, #64748b, transparent);
}

@keyframes meteor-effect {
  0% {
    transform: rotate(215deg) translateX(0);
    opacity: 1;
  }

  70% {
    opacity: 1;
  }

  100% {
    transform: rotate(215deg) translateX(-500px);
    opacity: 0;
  }
}
</style>
