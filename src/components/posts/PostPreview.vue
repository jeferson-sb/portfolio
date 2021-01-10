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
  background-color: var(--bg-color-lighter, var(--color-black-800));
  border-radius: var(--radius-default);
  width: 100%;
  padding: 18px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 28px;
  display: flex;
}

.post-preview__date {
  flex-basis: 60px;
  opacity: 0.7;
  color: var(--secondary-text-color, var(--color-default-white));
}

.post-preview__title {
  margin: 0;
}

body[data-theme='light'] .post-preview {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
}

body[data-theme='light'] .post-preview:hover {
  box-shadow: 0 4px 10px rgba(26, 187, 209, 0.15);
}
</style>
