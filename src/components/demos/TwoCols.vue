<template>
  <div class="two-column-layout">
    <slot />
  </div>
</template>

<style scoped>
.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
</style>
