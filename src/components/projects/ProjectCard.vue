<template>
  <div class="project-card">
    <figure class="project-thumbnail">
      <img-lazy :src="thumbnail" :alt="`${title} project screenshot`" class="project-card__image" fit="cover" width="500"
        height="200" />
    </figure>
    <div class="project-card__content">
      <div class="project-card__header">
        <h4 :id="titleId">{{ title }}</h4>
        <p>{{ description }}</p>
      </div>
      <div class="project-card__footer">
        <TagGroup :tags="tags.split(',')" />
        <AppLink :id="buttonId" is-external :to="github"
          :aria-labelledby="`${titleId} ${buttonId}`">
          Github
        </AppLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
})

const titleSlug = props.title.toLowerCase().replaceAll(' ', '')

const titleId = computed(() => `title-${titleSlug}`)
const buttonId = computed(() => `button-${titleSlug}`)
</script>

<style scoped>
.project-card {
  display: flex;
  flex-flow: column;
  border-radius: var(--radius-default);
  overflow: hidden;
}

.project-thumbnail {
  position: relative;
  flex: none;
  aspect-ratio: 3 / 1;
}

.project-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 20% center;

  &.lozad {
    filter: blur(0);
  }
}

.project-card__content {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  flex: 1;
  background-color: var(--bg-color-lighter, var(--color-gray-800));
  padding: 1.125rem;
}

.project-card__header {
  & h4 {
    font-size: var(--text-lg);
  }

  & p {
    margin-block-end: 10px;
    opacity: 0.7;
  }
}

.project-card__footer {
  .tags {
    margin-block-end: 1rem;
  }
}

body[data-theme='light'] {
  .project-card {
    border: var(--border);
  }
}
</style>
