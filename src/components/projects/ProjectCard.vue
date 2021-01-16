<template>
  <div class="project-card">
    <figure class="project-thumbnail">
      <g-image :src="project.thumbnail" alt="project screenshot" />
    </figure>
    <div class="project-card__content">
      <div class="project-card__header">
        <h4>{{ project.title }}</h4>
        <p>{{ project.description }}</p>
      </div>
      <div class="project-card__footer">
        <TagGroup :tags="project.tags.split(',')" />
        <g-link :to="project.github" class="button"> Github </g-link>
      </div>
    </div>
  </div>
</template>

<script>
import TagGroup from '@/components/ui/TagGroup.vue'

export default {
  components: {
    TagGroup,
  },
  props: {
    project: {
      type: Object,
    },
  },
}
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
  background-color: var(--bg-color-lighter, var(--color-black-800));
  padding: 18px;
  border-radius: 0 var(--radius-default) var(--radius-default) 0;
  border: 1px solid transparent;
  max-width: 265px;
}

.project-card__header {
  margin-bottom: 20px;
}

.project-card .project-card__header h4 {
  font-size: 18px;
  margin-bottom: 10px;
}

.project-card .project-card__header p {
  opacity: 0.7;
}

.project-card .project-card__footer .button {
  --button-bg-color: var(--color-primary);

  border-radius: var(--radius-default);
  width: 100%;
  text-decoration: none;
  font-weight: 700;
  color: var(--color-default-black);
}

body[data-theme='light'] .project-card__content {
  border: 1px solid rgba(0, 0, 0, 0.1);
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
