<template>
  <input
    type="range"
    class="input-range"
    @change="onChange"
    @input="onInput"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: {
    label: String,
  },
  methods: {
    onChange(event) {
      this.$emit('change', event.target.value)
    },
    onInput(event) {
      this.$el.style.setProperty('--range-progress', `${event.target.value}%`)
      this.$emit('input', event.target.value)
    },
  },
}
</script>

<style scoped>
.input-range {
  --range-color: var(--color-silver);
  --range-progress: 50%;

  background: transparent;
  appearance: none;
  cursor: pointer;
}

.input-range::-webkit-slider-thumb {
  --range-thumb-size: 16px;
  --range-thumb-color: #fff;

  -webkit-appearance: none;
  border-radius: 50%;
  height: var(--range-thumb-size);
  width: var(--range-thumb-size);
  cursor: grab;
  background: var(--range-thumb-color);
  border: 1px solid var(--range-thumb-color);
  transform: translateY(calc(-50% + 2px));
  box-shadow: 0 1px 2px hsla(0, 0%, 45%, 0.3), 0 0 3px hsla(0, 0%, 45%, 0.3);
}

.input-range::-moz-range-thumb {
  border-radius: 50%;
}

.input-range::-webkit-slider-runnable-track {
  width: calc(100% - 16px);
  height: 3px;
  background: linear-gradient(
    to right,
    var(--range-color) var(--range-progress),
    #fff var(--range-progress)
  );
  border-radius: 2px;
  margin: 8px 0px;
}

.input-range::-moz-range-track {
  background: linear-gradient(
    to right,
    var(--range-color) var(--range-progress),
    #fff var(--range-progress)
  );
}
</style>
