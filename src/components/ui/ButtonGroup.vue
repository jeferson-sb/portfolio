<template>
  <div :class="styles">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'row',
      validator(val) {
        return ['row', 'column'].includes(val)
      },
    },
    grouped: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styles() {
      return {
        'button-group': true,
        'button-group--vertical': this.direction === 'column',
        'button-group--grouped': this.grouped,
      }
    },
  },
}
</script>

<style scoped>
.button-group {
  display: flex;
  flex-flow: row wrap;
}

.button-group .button {
  margin: 5px;
}

.button-group--grouped .button {
  margin: 0;
  border-radius: 0;
}

.button-group--grouped .button:first-child {
  border-top-left-radius: var(--radius-default);
  border-bottom-left-radius: var(--radius-default);
}

.button-group--grouped .button:last-child {
  border-top-right-radius: var(--radius-default);
  border-bottom-right-radius: var(--radius-default);
}

.button-group--vertical {
  flex-direction: column;
}
</style>
