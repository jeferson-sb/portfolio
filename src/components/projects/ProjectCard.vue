<template>
  <div class="project-card">
    <figure class="project-thumbnail">
      <img-lazy :src="thumbnail" :alt="`${title} project screenshot`" class="project-card__image" width="500"
        height="200" />
    </figure>
    <div class="project-card__content">
      <div class="project-card__header">
        <h4 :id="titleId">{{ title }}</h4>
        <p>{{ description }}</p>
      </div>
      <div class="project-card__footer">
        <TagGroup :tags="tags.split(',')" />
        <AppLink :id="buttonId" variant="button" full is-external :to="github"
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
}

.project-thumbnail {
  flex-basis: 50%;
  border-radius: var(--radius-default) 0 0 var(--radius-default);
}

.project-card__image {
  border-radius: inherit;
  object-fit: cover;
  object-position: top center;
  height: 200px;
  min-height: 100%;

  &.lozad {
    filter: blur(0);
  }
}

.project-card__content {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  flex-basis: 50%;
  background-color: var(--bg-color-lighter, var(--color-gray-800));
  padding: 1.125rem;
  border-radius: 0 var(--radius-default) var(--radius-default) 0;
  border: 1px solid transparent;
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
  .project-card__content {
    border: var(--border);
  }
}

@media (--vw-sm) {
  .project-card {
    flex-direction: column;
  }
}
</style>
