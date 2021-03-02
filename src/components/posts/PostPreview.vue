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
  color: inherit;
  width: 100%;
  outline: 0;
}

a:hover {
  text-decoration: none;
}

a:focus .post-preview {
  box-shadow: 0 4px 10px hsla(187, 78%, 46%, 0.5);
}

.post-preview {
  background-color: var(--bg-color-lighter, var(--color-gray-800));
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

a:hover .post-preview__title {
  color: var(--color-primary);
  transition: color 0.3s ease-in-out;
}

body[data-theme='light'] .post-preview {
  box-shadow: var(--elevation-3);
}

body[data-theme='light'] a:hover .post-preview,
body[data-theme='light'] a:focus .post-preview {
  box-shadow: 0 4px 10px hsla(187, 78%, 46%, 0.2);
}
</style>
