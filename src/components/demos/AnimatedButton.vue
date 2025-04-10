<template>
  <button class="button">Press me</button>
</template>

<style scoped>
.button {
  position: relative;
  padding: 1rem 2rem;
  border-radius: var(--radius-default);
  width: fit-content;
  background-color: hsl(50deg 70% 61.67%);
  color: hsl(0deg 0% 11%);
  margin-inline: auto;
  margin-block: 2rem;
  transition: transform 400ms ease-out;
}

.button:active {
  transform: scale(0.4);
}

.button::before {
  content: '';
  z-index: -1;
  position: absolute;
  inset: 0;
  border: 4px solid hsl(50deg 43% 49%);
  border-radius: var(--radius-default);
  transform: scale(1);
}

.button:focus::before {
  transition: opacity 700ms ease-in-out, transform 700ms ease-in-out;
  transform: scale(1.3);
  opacity: 0;
}
</style>
