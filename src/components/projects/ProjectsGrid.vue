<template>
  <section class="projects-grid container" id="projects">
    <h3>Projects</h3>
    <ProjectCard
      v-for="edge in $static.projects.edges"
      :key="edge.node.id"
      :project="edge.node"
    />
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

<static-query>
query Projects {
	projects: allProjects(sortBy: "order", order: ASC, filter: { pinned: { eq: true }}) {
    edges {
      node {
        id
        title
        tags
        thumbnail (quality: 90)
        demo
        github
        description
      }
    }
  }
}
</static-query>

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
