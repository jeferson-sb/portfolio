<template>
  <div>
    <ButtonGroup grouped>
      <Button @click="columns = 6">
        <template v-slot:icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"
            />
          </svg>
        </template>
        Small
      </Button>
      <Button @click="columns = 3">
        <template v-slot:icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V9z"
            />
          </svg>
        </template>
        Large
      </Button>
      <Button @click="columns = 1">
        <template v-slot:icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
        List
      </Button>
    </ButtonGroup>
    <code> --gallery-columns: {{ columns }} </code>
    <div class="gallery" ref="gallery">
      <figure class="image" v-for="i in 6" :key="i">
        <img
          :src="`https://picsum.photos/id/${i * 100}/400/200`"
          loading="lazy"
          alt=""
        />
      </figure>
    </div>
  </div>
</template>

<script>
import ButtonGroup from '@/components/ui/ButtonGroup.vue'
import Button from '@/components/ui/Button.vue'

export default {
  name: 'Gallery',
  components: {
    Button,
    ButtonGroup,
  },
  data() {
    return {
      columns: 0,
    }
  },
  watch: {
    columns() {
      this.$refs.gallery.style.setProperty('--gallery-columns', this.columns)
    },
  },
}
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(var(--gallery-columns, 6), 1fr);
  grid-gap: 10px;
  margin-top: 10px;
}

.image {
  background-color: hsl(250, 50%, 50%);
  border-radius: var(--radius-default);
  max-width: 400px;
}

.image img {
  object-fit: cover;
  margin: 0;
}

.button svg {
  width: 16px;
}
</style>
