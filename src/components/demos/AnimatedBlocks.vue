<template>
  <div class="blocks">
    <span v-for="i in 3" :key="i" class="block" :style="`--order: ${i}`"></span>
  </div>
</template>

<style scoped>
.blocks {
  display: flex;
  gap: 1rem;
  margin-block: 1rem;
}

.block {
  --hsl: 8 50% 50%;

  display: inline-block;
  background-color: hsl(var(--hsl));
  border-radius: var(--radius-default);
  width: var(--w, 4rem);
  height: var(--h, 4rem);
  animation: drop-in 4s ease-out infinite forwards;
  animation-delay: calc(var(--order) * 500ms);
}

.block:nth-child(2) {
  --hsl: 50 50% 50%;
}

.block:nth-child(3) {
  --hsl: 180 50% 50%;
}

@keyframes drop-in {
  20% {
    opacity: 0;
    transform: translateY(-20%);
  }

  50% {
    opacity: 0.5;
    transform: translateY(-10%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
