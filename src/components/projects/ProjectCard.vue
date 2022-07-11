<template>
  <div class="project-card">
    <figure class="project-thumbnail">
      <img-lazy
        :src="thumbnail"
        :alt="`${title} project screenshot`"
        class="project-card__image"
        width="600"
        height="220"
      />
    </figure>
    <div class="project-card__content">
      <div class="project-card__header">
        <h4 :id="titleId">{{ title }}</h4>
        <p>{{ description }}</p>
      </div>
      <div class="project-card__footer">
        <TagGroup :tags="tags.split(',')" />
        <AppLink
          variant="button"
          full
          isExternal
          :to="github"
          :id="buttonId"
          :aria-labelledby="`${titleId} ${buttonId}`"
        >
          Github
        </AppLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  thumbnail: String,
  title: String,
  description: String,
  tags: String,
  github: String,
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
  max-width: 274px;
  border-radius: var(--radius-default) 0 0 var(--radius-default);
}

.project-thumbnail img {
  border-radius: inherit;
  object-fit: cover;
  min-height: 100%;
}

.project-card .project-card__content {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: var(--bg-color-lighter, var(--color-gray-800));
  padding: 18px;
  border-radius: 0 var(--radius-default) var(--radius-default) 0;
  border: 1px solid transparent;
  max-width: 265px;
}

.project-card__header {
  margin-bottom: 20px;
}

.project-card .project-card__header h4 {
  font-size: var(--text-lg);
  margin-bottom: 10px;
}

.project-card .project-card__header p {
  opacity: 0.7;
}

body[data-theme='light'] .project-card__content {
  border: var(--border);
}

.project-card__image {
  filter: blur(10px);
  transition: filter 0.7s;
  will-change: filter;
}

.project-card__image.lozad {
  filter: blur(0);
}

@media screen and (max-width: 768px) {
  .project-card {
    flex-direction: column;
  }

  .project-thumbnail {
    height: 180px;
  }

  .project-thumbnail,
  .project-card .project-card__content {
    max-width: 100%;
  }
}
</style>
