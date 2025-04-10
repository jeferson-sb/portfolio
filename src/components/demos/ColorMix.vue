<template>
  <div class="container">
    <svg width="300" height="100" viewBox="0 0 100 100">
      <defs>
        <clipPath id="mask">
          <circle id="circle-right" r="50%" cy="50%" cx="0%" stroke-width="1" stroke="#000" fill="none" />
        </clipPath>
      </defs>
      <g>
        <circle id="center" r="50%" cy="50%" cx="-50" fill="var(--mix)" clip-path="url(#mask)" />
        <circle id="circle-left" r="50%" cx="-50" cy="50%" stroke-width="0" stroke="#000" fill="var(--left)" />
        <circle id="circle-right" r="50%" cx="0%" cy="50%" stroke-width="0" stroke="#000" fill="var(--right)" />
      </g>
      <circle title="Result mix" r="20%" cx="100%" cy="50%" stroke-width="0" stroke="#000" fill="var(--result)" />
    </svg>
    <div class="controls">
      <div v-show="controls.includes('colorSpace')" class="colorspace">
        <span>in</span>
        <BaseSelect aria-label="Select a color method" :options="['lch', 'hsl', 'lab', 'srgb']" :selected="method"
          @change="onChange" />
      </div>
      <div v-show="controls.includes('stop')" class="range">
        <span>L {{ colorStopLeft }}%</span>
        <BaseRange @input="onRange" />
        <span>R {{ colorStopRight }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  method: {
    type: String,
    required: true,
  },
  controls: {
    type: String,
    default: '',
    validator(v) {
      return ['stop', 'colorSpace', 'colorSpace stop', ''].includes(v)
    },
  },
  left: {
    type: String,
    default: "50",
  },
  right: {
    type: String,
    default: "50",
  },
})

const colorMethod = ref(`in ${props.method}`)
const colorStopLeft = ref(props.left)
const colorStopRight = ref(props.right)

const onChange = (v) => {
  colorMethod.value = `in ${v}`
}
const onRange = (v) => {
  if (typeof v === 'string') {
    colorStopRight.value = Number(v)
    colorStopLeft.value = 100 - Number(v)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  padding-block: 1rem;
}

svg {
  --method: v-bind(colorMethod);
  --l-stop: calc(v-bind(colorStopLeft) * 1%);
  --r-stop: calc(v-bind(colorStopRight) * 1%);
  --mix: color-mix(var(--method),
      var(--left) var(--l-stop, 50%),
      var(--right) var(--r-stop, 50%));

  --result: var(--mix);
}

circle {
  transition: opacity 400ms ease-out;
}

#circle-left,
#circle-right {
  opacity: 0.4;
}

circle:not(#center):hover {
  opacity: 1;
}

.controls span {
  font-style: italic;
  font-variant-numeric: tabular-nums;
  font-family: var(--font-mono);
}

.colorspace span {
  margin-inline-end: 1rem;
}

.colorspace select {
  padding: 0.25em 1em;
  background-color: var(--color-light, --color-default-black);
  color: var(--text-color-default);
  border-radius: var(--radius-default);
}

.range {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}
</style>
