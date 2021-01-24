<template>
  <g-link :to="href" :aria-labelledby="articleId">
    <article class="post-preview">
      <time class="post-preview__date" :datetime="date">
        {{ formattedDate }}
      </time>
      <h4 class="post-preview__title" :id="articleId">{{ title }}</h4>
    </article>
  </g-link>
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
    href: {
      type: String,
    },
    articleId: {
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
a {
  text-decoration: none;
  color: inherit;
  width: 100%;
}

.post-preview {
  background-color: var(--bg-color-lighter, var(--color-black-800));
  border-radius: var(--radius-default);
  width: 100%;
  padding: 18px;
  box-shadow: var(--elevation-2);
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
  box-shadow: var(--elevation-3);
}

body[data-theme='light'] .post-preview:hover {
  box-shadow: 0 4px 10px rgba(26, 187, 209, 0.15);
}
</style>
