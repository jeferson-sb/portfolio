<template functional>
  <input
    :placeholder="props.label"
    class="input"
    @input="$emit('input', $event.target.value)"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped></style>
