<template>
  <div class="project-card">
    <figure class="project-thumbnail">
      <g-image :src="project.thumbnail" alt="project screenshot" />
    </figure>
    <div class="project-card__content">
      <div class="project-card__header">
        <h4 :id="titleId">{{ project.title }}</h4>
        <p>{{ project.description }}</p>
      </div>
      <div class="project-card__footer">
        <TagGroup :tags="project.tags.split(',')" />
        <Button
          variant="primary"
          full
          :to="project.github"
          :id="buttonId"
          :aria-labelledby="`${titleId} ${buttonId}`"
        >
          Github
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import TagGroup from '@/components/ui/TagGroup.vue'
import Button from '@/components/ui/Button.vue'

export default {
  components: {
    TagGroup,
    Button,
  },
  props: {
    project: {
      type: Object,
    },
  },
  computed: {
    titleId() {
      return `title-${this.project.id}`
    },
    buttonId() {
      return `button-${this.project.id}`
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
