<template>
  <button aria-label="menu" class="hamburger-menu" @click="$emit('toggle')">
    <span class="bar top"></span>
    <span class="bar bottom"></span>
  </button>
</template>

<script setup>
defineEmits(['toggle'])
</script>

<style scoped>
.hamburger-menu {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  height: 1rem;
  width: 2rem;
  background: transparent;
  border: 1px solid transparent;
  padding: 0;

  & .bar {
    width: 100%;
    height: 3px;
    background: var(--text-color-default, --color-default-white);
    border-radius: 5px;
    transform-origin: center;
    transition-property: transform, opacity;
    transition-timing-function: ease-out;
    transition-duration: 500ms;
  }
}
</style>
