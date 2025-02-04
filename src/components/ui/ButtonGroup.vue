<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
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
});

const classes = computed(() => ({
  'button-group': true,
  'button-group--vertical': props.direction === 'column',
  'button-group--grouped': props.grouped,
}))
</script>

<style scoped>
.button-group {
  --orientation: row;

  display: flex;
  flex-flow: var(--orientation) wrap;

  & .button {
    margin: 5px;
  }
}

.button-group--grouped {
  :deep(.button) {
    margin: 0;
    border-radius: 0;

    &:first-child {
      border-top-left-radius: var(--radius-default);
      border-bottom-left-radius: var(--radius-default);
    }

    &:last-child {
      border-top-right-radius: var(--radius-default);
      border-bottom-right-radius: var(--radius-default);
    }
  }
}

.button-group--vertical {
  --orientation: column;
}
</style>
