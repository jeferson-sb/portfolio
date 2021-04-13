<template>
  <div :class="classes">
    <span>{{ title }}</span>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'InteractiveWrapper',
  props: {
    title: {
      type: String,
      default: 'Interactive Example',
    },
    borderless: {
      type: Boolean,
    },
    resizable: {
      type: Boolean,
    },
  },
  computed: {
    classes() {
      return {
        'interactive-wrapper': true,
        'interactive-wrapper--borderless': this.borderless,
      }
    },
  },
}
</script>

<style scoped>
.interactive-wrapper {
  border: 1px solid var(--color-silver);
  padding: 0.7rem;
  margin: 1rem 0;
  border-radius: var(--radius-default);
  position: relative;
}

.interactive-wrapper span {
  text-transform: uppercase;
  color: var(--color-silver);
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  font-weight: 700;
  background: var(--color-light, var(--color-default-black));
  position: absolute;
  top: -10px;
  padding: 0 10px;
}
</style>
