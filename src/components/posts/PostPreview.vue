<template>
  <article class="post-preview">
    <time class="post-preview__date" :datetime="date.toISOString()">
      {{ formattedDate }}
    </time>
    <h4 class="post-preview__title">{{ title }}</h4>
  </article>
</template>

<script>
export default {
  props: {
    date: {
      type: Date,
    },
    title: {
      type: String,
    },
  },
  computed: {
    formattedDate() {
      return this.date.toLocaleString(['en-US'], {
        day: '2-digit',
        month: 'short',
      })
    },
  },
}
</script>

<style scoped>
.post-preview {
  background-color: var(--color-black-800);
  border-radius: var(--radius-default);
  width: 100%;
  padding: 18px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 28px;
  display: flex;
}

.post-preview__date {
  flex-basis: 60px;
  opacity: 0.7;
}

.post-preview__title {
  margin: 0;
}
</style>
