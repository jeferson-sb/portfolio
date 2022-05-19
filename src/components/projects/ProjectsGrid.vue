<template>
  <section class="projects-grid container" id="projects">
    <h3>Projects</h3>
    <ProjectCard
      v-for="project in highlightedProjects"
      :key="project.title"
      :thumbnail="project.thumbnail"
      :title="project.title"
      :description="project?.description"
      :tags="project.tags"
      :github="project.github"
    />
  </section>
</template>

<script setup>
import projects from '@content/projects/projects.json'

const highlightedProjects = Object.values(projects).filter(
  (project) => project.pinned
)
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  margin-bottom: 4rem;
}

.projects-grid h3 {
  grid-column: 1 / 3;
  text-transform: uppercase;
  margin: 33px 0 0;
}

@media screen and (max-width: 1024px) {
  .projects-grid {
    padding: 18px;
  }
}

@media screen and (max-width: 425px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .projects-grid h3 {
    grid-column: 1;
  }
}
</style>
