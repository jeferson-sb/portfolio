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
  z-index: var(--z-100);
  font-weight: var(--fw-bold);
}

.skip-link:focus {
  top: 0;
}
</style>
