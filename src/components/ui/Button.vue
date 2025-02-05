<template>
  <component v-bind="$attrs" :is="isAnchor ? 'router-link' : 'button'" :class="styles" :to="isAnchor ? href : null">
    <slot name="icon"></slot>
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'solid',
      validator(val) {
        return ['solid', 'outline', 'link'].includes(val)
      },
    },
    colorScheme: {
      type: String,
      default: 'gray',
      validator(val) {
        return ['cyan', 'white', 'gray'].includes(val)
      }
    },
    size: {
      type: String,
      default: 'normal',
    },
    href: {
      type: String,
      default: null,
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
    color() {
      return `button--${this.colorScheme}`
    },
    styles() {
      return {
        button: true,
        [this.type]: true,
        [this.color]: true,
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
  --button-shadow-color: hsl(187deg 78% 46% / 84.2%);
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
  transition: filter 300ms ease-in-out;
  border-radius: var(--button-radius);

  &:hover {
    filter: brightness(80%);
  }

  &:focus {
    outline-color: transparent;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 0.19rem var(--button-shadow-color);
  }

  &::after {
    all: unset;
  }
}

.button--cyan {
  --button-bg-color: var(--color-primary);
  --button-text-color: var(--color-default-black);
  --button-fw: 700;
}

.button--gray {
  --button-bg-color: var(--color-gray-600);
  --button-text-color: var(--color-default-white);
}

.button--white {
  --button-bg-color: var(--color-gray-100);
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

  &:hover {
    --button-bg-color: var(--color-gray-600);

    filter: unset;
  }
}

.button--icon {
  --offset: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    margin-inline-end: var(--offset);
  }
}

.button--rounded-full {
  --button-radius: 9999px;

  padding: 0.75rem;

  & .button--icon>* {
    margin: 0;
  }

  & .button--icon {
    justify-content: center;
  }
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

body[data-theme='light'] .button {
  color: var(--button-text-color);
}
</style>
