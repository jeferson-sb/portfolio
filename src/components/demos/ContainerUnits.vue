<template>
  <div class="container">
    <BaseRange @input="onRange" />
    <div class="block">
      <div ref="computed" class="computed">
        <div>
          <span>
            {{ cqi }}cqi
          </span>
          <span>
            = {{ parsed.inline }}px
          </span>
        </div>

        <div>
          <span>
            {{ cqb }}cqb
          </span>
          <span>
            = {{ parsed.block }}px
          </span>
        </div>

        <div>
          <span>
            {{ cqmax }}cqmax
          </span>
          <span>
            = {{ parsed.larger }}px
          </span>
        </div>

        <div>
          <span>
            {{ cqmin }}cqmin
          </span>
          <span>
            = {{ parsed.smaller }}px
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'

const container = useTemplateRef('computed')
const parsed = ref({ inline: '0', block: '0', larger: '0', smaller: '0' })

const cqi = ref('0')
const cqb = ref('0')
const cqmax = ref('0')
const cqmin = ref('0')
const range = ref(0)

const onRange = v => {
  range.value = v
  cqi.value = v
  cqb.value = v
  cqmax.value = v
  cqmin.value = v
  const s = container.value.computedStyleMap()

  parsed.value.inline = Number(s.get('left').value).toFixed(3)
  parsed.value.block = Number(s.get('bottom').value).toFixed(3)
  parsed.value.larger = Number(s.get('top').value).toFixed(3)
  parsed.value.smaller = Number(s.get('right').value).toFixed(3)
}
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  gap: 1rem;
  border-radius: var(--radius-default);
  border: 1px solid var(--color-silver);
  width: min(300px, 100% - 2rem);
  height: fit-content;
  padding: 0.75rem 2rem;
}

.block {
  container-type: inline;

  display: inline-block;
  align-content: center;
}

.computed {
  --value: v-bind(range);

  left: calc(var(--value) * 1cqi);
  bottom: calc(var(--value) * 1cqb);
  right: calc(var(--value) * 1cqmin);
  top: calc(var(--value) * 1cqmax);
}

input[type=range] {
  max-width: 200px;
}
</style>
