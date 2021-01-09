<template>
  <section class="projects-grid container">
    <h3>Projects</h3>
    <ProjectCard />
    <ProjectCard />
    <ProjectCard />
    <ProjectCard />
  </section>
</template>

<script>
import ProjectCard from './ProjectCard'

export default {
  components: {
    ProjectCard,
  },
}
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
  font-family: var(--font-title);
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
