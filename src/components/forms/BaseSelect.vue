<template>
  <select v-bind="$attrs" @change="$emit('change', $event.target.value)">
    <option v-for="opt in options" :key="opt" :value="opt" :selected="opt == selected">
      {{ opt }}
    </option>
  </select>
</template>

<script setup>
defineEmits(['change'])
defineProps({
  label: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  selected: {
    type: [String, Number],
    default: ''
  }
})
</script>
