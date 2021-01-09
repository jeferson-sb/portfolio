<template>
  <div class="project-card">
    <figure class="project-thumbnail">
      <g-image src="https://picsum.photos/1280/720" alt="project 0101" />
    </figure>
    <div class="project-card__content">
      <div class="project-card__header">
        <h4>Project 0101</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>
      <div class="project-card__footer">
        <TagGroup :tags="['frontend', 'ai', 'react']" />
        <g-link to="https://github.com/jeferson-sb" class="button">
          Github
        </g-link>
      </div>
    </div>
  </div>
</template>

<script>
import TagGroup from '@/components/ui/TagGroup.vue'

export default {
  components: {
    TagGroup
  }
}
</script>

<style scoped>

.project-card {
  display: flex;
}

.project-thumbnail {
  flex-basis: 60%;
  border-radius: var(--radius-default) 0 0 var(--radius-default);
}

.project-thumbnail img {
  border-radius: inherit;
  object-fit: cover;
  min-height: 100%;
}

.project-card .project-card__content {
  background-color: var(--color-black-800);
  padding: 18px;
  border-radius: 0 var(--radius-default) var(--radius-default) 0;
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

@media screen and (max-width: 425px) {
  .project-card {
    flex-direction: column;
  }

  .project-thumbnail {
    max-height: 180px;
  }
}

</style>
