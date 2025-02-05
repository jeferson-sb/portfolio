<template>
  <section id="projects" class="projects-grid container">
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
  grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
  grid-gap: 1rem;
  margin-block-end: 4rem;

  h3 {
    grid-column: 1 / -1;
    text-transform: uppercase;
    margin-block-start: 2rem;
  }
}
</style>
