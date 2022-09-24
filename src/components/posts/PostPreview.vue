<template>
  <article :class="styles">
    <div class="post-preview-metadata">
      <time class="post-preview__date" :datetime="date">
        {{ formattedDate }}
      </time>
      <TagGroup v-if="size === 'long'" :tags="tags.split(',')" />
    </div>

    <AppLink :to="href">
      <h4 class="post-preview__title" :id="articleId">{{ title }}</h4>
    </AppLink>

    <Tag
      tagName="NEW"
      variant="accent"
      v-show="size === 'short' && isRecentPost"
    />
    <template v-if="size === 'long'">
      <p class="post-preview__description">
        {{ excerpt }}
      </p>
      <Button :href="href" :aria-describedby="articleId"> Read more </Button>
    </template>
  </article>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
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
  excerpt: {
    type: String,
    default: '',
  },
  tags: {
    type: String,
  },
  size: {
    type: String,
    default: 'short',
  },
})

const styles = computed(() => ({
  'post-preview': true,
  'post-preview--long': props.size === 'long',
  'post-preview--short': props.size === 'short',
}))

const diffInDays = (a, b) => {
  const DAY_IN_MS = 1000 * 3600 * 24
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor((utc2 - utc1) / DAY_IN_MS)
}

const isRecentPost = diffInDays(props.date, new Date()) <= 7

const formattedDate = computed(() =>
  props.date.toLocaleString(['en-US'], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
)
</script>

<style scoped>
.post-preview {
  background-color: var(--bg-color-lighter, var(--color-gray-800));
  border-radius: var(--radius-default);
  width: 100%;
  padding: 18px;
  box-shadow: var(--elevation-2);
  margin-bottom: 28px;
  display: flex;
  position: relative;
}

.post-preview-metadata:not(.post-preview--long) {
  flex-basis: 100px;
  display: flex;
  align-items: center;
}

.post-preview__date {
  opacity: 0.7;
  color: var(--secondary-text-color, var(--color-default-white));
}

.post-preview__title {
  margin: 0;
}

.post-preview--long {
  flex-direction: column;
  max-width: 700px;
}

.post-preview--long .post-preview__title {
  font-size: var(--text-xl);
}

.post-preview--long .post-preview__date {
  flex-basis: unset;
}

.post-preview--long .post-preview-metadata {
  justify-content: space-between;
  flex-basis: unset;
}

.post-preview--short {
  align-items: center;
}

.post-preview--short a {
  margin: 0;
}

.post-preview--short a::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.post-preview--short a:focus::after {
  box-shadow: 0 4px 10px hsla(187, 78%, 46%, 0.5);
}

a {
  color: inherit;
  width: 100%;
}

a:hover {
  text-decoration: none;
}

a:hover .post-preview__title {
  color: var(--color-primary);
  transition: color 0.3s ease-in-out;
}

a:focus {
  outline-color: transparent;
}

body[data-theme='light'] .post-preview {
  box-shadow: var(--elevation-3);
}

body[data-theme='light'] a:hover .post-preview,
body[data-theme='light'] a:focus .post-preview {
  box-shadow: 0 4px 10px hsla(187, 78%, 46%, 0.2);
}

@media screen and (max-width: 425px) {
  .post-preview-metadata {
    margin-right: 7px;
  }
}
</style>
