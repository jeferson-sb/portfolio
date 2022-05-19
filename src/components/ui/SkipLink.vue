<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translate(-50%);
  background: var(--color-accent);
  color: var(--color-default-black);
  padding: 10px;
  z-index: 100;
  font-weight: 700;
}

.skip-link:focus {
  top: 0;
}
</style>
