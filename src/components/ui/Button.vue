<template>
  <component
    :class="styles"
    v-bind="$attrs"
    :is="isAnchor ? 'router-link' : 'button'"
    :to="isAnchor ? href : null"
  >
    <slot name="icon"></slot>
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'default',
      validator(val) {
        return ['primary', 'outline', 'default', 'link'].includes(val)
      },
    },
    size: {
      type: String,
      default: 'normal',
    },
    href: {
      type: String,
    },
    squared: {
      type: Boolean,
    },
    full: {
      type: Boolean,
    },
    circle: {
      type: Boolean,
    },
  },
  computed: {
    type() {
      return `button--${this.variant}`
    },
    styles() {
      return {
        button: true,
        [this.type]: true,
        'button--squared': this.squared,
        'button--full': this.full,
        'button--icon': Boolean(this.$slots.icon),
        'button--rounded-full': this.circle,
      }
    },
    isAnchor() {
      return this.variant === 'link' || Boolean(this.href)
    },
  },
}
</script>

<style scoped>
.button {
  --button-bg-color: var(--color-gray-600);
  --button-text-color: var(--color-default-white);
  --button-shadow-color: hsla(187, 78%, 46%, 0.366);
  --button-fw: 400;
  --button-radius: var(--radius-default);

  display: inline-block;
  text-align: center;
  padding: 0.5rem 1rem;
  max-width: fit-content;
  color: var(--button-text-color);
  background-color: var(--button-bg-color);
  font-weight: var(--button-fw);
  font-size: var(--button-font-size, inherit);
  transition: filter 0.3s ease-in-out;
  border-radius: var(--button-radius);
}

.button:hover {
  text-decoration: none;
  filter: brightness(70%);
}

.button:focus {
  outline: 0;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 0.19rem var(--button-shadow-color);
}

.button::after {
  all: unset;
}

.button--primary {
  --button-bg-color: var(--color-primary);
  --button-text-color: var(--color-default-black);
  --button-fw: 700;
}

.button--outline {
  --button-text-color: var(--color-primary);
  --button-bg-color: transparent;
  --button-fw: 700;

  border: 1px solid var(--color-primary);
}

.button--link {
  --button-bg-color: transparent;
  --button-text-color: var(--text-color-default);

  transition: background-color 0.3s ease-in-out;
}

.button--link:hover {
  --button-bg-color: var(--color-gray-600);

  filter: unset;
}

.button--icon {
  display: flex;
  align-items: center;
}

.button--icon svg {
  margin-right: 4px;
}

.button--rounded-full {
  --button-radius: 9999px;

  padding: 0.75rem;
}

.button--rounded-full.button--icon > * {
  margin: 0;
}

.button--squared {
  --button-radius: 0;
}

.button--full {
  width: 100%;
  max-width: 100%;
}

.button[disabled] {
  --button-text-color: var(--color-gray-400);
  --button-bg-color: var(--color-gray-800);

  cursor: not-allowed;
}
</style>
