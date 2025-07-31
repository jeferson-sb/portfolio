<template>
  <div class="demo">
    <slot />
  </div>
</template>

<style scoped>
.demo {
  --space: 2rem;
  --bg: lch(10.63% 8.08 289.58);
  padding: var(--space);
  background-color: var(--bg);
  border-radius: var(--radius-default);
}
</style>
