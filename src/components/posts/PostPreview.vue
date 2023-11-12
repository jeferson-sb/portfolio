<template>
  <article :class="styles">
    <div class="post-preview-metadata">
      <time class="post-preview__date" :datetime="date">
        {{ formattedDate }}
      </time>
      <TagGroup v-if="size === 'long'" :tags="tags.split(',')" linkable />
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
  --max-lines: 3;

  display: flex;
  position: relative;
  width: 100%;
  padding: 1.125rem;
  background-color: var(--bg-color-lighter, var(--color-gray-800));
  border-radius: var(--radius-default);
  box-shadow: var(--elevation-2);
}

.post-preview-metadata:not(.post-preview--long) {
  display: flex;
  align-items: center;
}

.post-preview__date {
  opacity: 0.7;
  color: var(--secondary-text-color, var(--color-default-white));
}

.post-preview__description {
  display: -webkit-box;
  -webkit-line-clamp: var(--max-lines);
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-preview--long {
  flex-direction: column;
  max-width: 700px;

  & .post-preview__title {
    font-size: var(--text-xl);
  }

  & .post-preview-metadata {
    justify-content: space-between;
  }
}

.post-preview--short {
  align-items: center;
  gap: 1rem;

  & a {
    margin: 0;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &:focus::after {
      box-shadow: 0 4px 10px hsla(187, 78%, 46%, 0.5);
    }
  }
}

.post-preview {
  a {
    color: inherit;
    &:hover {
      text-decoration: unset;
    }
    &:hover .post-preview__title {
      color: var(--color-primary);
      transition: color 300ms ease-in-out;
    }

    &:focus:not(:focus-visible) {
      outline-color: transparent;
    }
  }
}

.post-preview .button:active {
  transform: translateY(4px);
  transition: transform 200ms ease-out;
}

body[data-theme='light'] {
  & .post-preview {
    box-shadow: var(--elevation-3);
  }

  & a:hover .post-preview,
  & a:focus .post-preview {
    box-shadow: 0 4px 10px hsla(187, 78%, 46%, 0.2);
  }
}
</style>
