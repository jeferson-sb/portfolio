<template>
  <button aria-label="menu" class="hamburger-menu" v-bind="$attrs">
    <span class="bar top"></span>
    <span class="bar middle"></span>
    <span class="bar bottom"></span>
  </button>
</template>

<style scoped>
.hamburger-menu {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  height: 1.5rem;
  width: 2rem;
  background: transparent;
  border: 1px solid transparent;
  padding: 0;
}

.hamburger-menu .bar {
  width: 100%;
  height: 3px;
  background: var(--text-color-default, --color-default-white);
  border-radius: 5px;
  transform-origin: center;
  transition-property: transform, opacity;
  transition-timing-function: ease-out;
  transition-duration: 500ms;
}

.hamburger-menu--active .top {
  transform: rotate(45deg) translate(10px, 4px);
}

.hamburger-menu--active .middle {
  opacity: 0;
}

.hamburger-menu--active .bottom {
  transform: rotate(-45deg) translate(10px, -4px);
}
</style>
