<template>
  <button v-if="!isAnchor" :class="styles" v-bind="$attrs" v-on="$listeners">
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
      return this.variant === 'link' || Boolean(this.to)
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

  display: inline-block;
  text-align: center;
  padding: 8px 16px;
  max-width: fit-content;
  color: var(--button-text-color);
  background-color: var(--button-bg-color);
  font-weight: var(--button-fw);
  font-size: var(--button-font-size, inherit);
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

.button--squared {
  border-radius: 0;
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
