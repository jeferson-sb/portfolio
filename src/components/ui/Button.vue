<template>
  <button v-if="!isAnchor" :class="styles" v-bind="$attrs">
    <slot name="icon"></slot>
    <slot />
  </button>
  <g-link v-else-if="isAnchor" :to="to" :class="styles" v-bind="$attrs">
    <slot name="icon"></slot>
    <slot />
  </g-link>
</template>

<script>
export default {
  inheritAttrs: false,
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
    to: {
      type: String,
    },
    squared: {
      type: Boolean,
    },
    full: {
      type: Boolean,
    },
  },
  emits: ['click'],
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
      }
    },
    isAnchor() {
      return this.variant === 'link' || this.to !== ''
    },
  },
}
</script>

<style scoped>
.button {
  --button-bg-color: var(--color-gray-600);
  --shadow-color: hsla(187, 78%, 46%, 0.366);
  --fw: 600;

  display: inline-block;
  text-align: center;
  padding: 8px 16px;
  max-width: fit-content;
  color: var(--color-default-white);
  background-color: var(--button-bg-color);
  font-weight: var(--fw);
  transition: filter 0.3s ease-in-out;
  border-radius: var(--radius-default);
}

.button:hover {
  text-decoration: none;
  filter: brightness(70%);
}

.button:focus {
  outline: 0;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 0.19rem var(--shadow-color);
}

.button::after {
  all: unset;
}

.button--primary {
  --button-bg-color: var(--color-primary);
  --fw: 700;

  color: var(--color-default-black);
}

.button--outline {
  --fw: 700;

  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.button--link {
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;
  color: var(--text-color-default);
}

.button--link:hover {
  background-color: var(--color-gray-600);
  filter: unset;
}

.button--icon {
  display: flex;
  align-items: center;
}

.button--icon svg {
  margin-right: 4px;
}

.button--squared {
  border-radius: 0;
}

.button--full {
  width: 100%;
  max-width: 100%;
}

.button[disabled] {
  color: var(--color-gray-400);
  background-color: var(--color-gray-800);
  cursor: not-allowed;
}
</style>
