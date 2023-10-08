<template>
  <select @change="$emit('change', $event.target.value)" v-bind="$attrs">
    <option
      v-for="opt in options"
      :value="opt"
      :key="opt"
      :selected="opt == selected"
    >
      {{ opt }}
    </option>
  </select>
</template>

<script setup>
defineEmits(['change'])
defineProps(['label', 'options', 'selected'])
</script>
