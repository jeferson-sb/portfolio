<template>
  <section class="github-projects container">
    <h3>Open Source</h3>
    <h4>Latest contributions</h4>
    <div class="github-repositories">
      <GithubRepoCard
        v-for="repo in repositories"
        :key="repo.id"
        :repository="repo"
      />
    </div>
  </section>
</template>

<script>
import GithubRepoCard from './GithubRepoCard.vue'

export default {
  components: {
    GithubRepoCard,
  },
  data() {
    return {
      repositories: [
        {
          id: 1,
          name: 'Grommet',
          description:
            'a react-based framework that provides accessibility, modularity, responsiveness, and theming in a tidy package',
          language: 'JavaScript',
          stars: 7000,
          prs: 245,
        },
        {
          id: 2,
          name: 'Grommet',
          description:
            'a react-based framework that provides accessibility, modularity, responsiveness, and theming in a tidy package',
          language: 'JavaScript',
          stars: 7000,
          prs: 245,
        },
      ],
    }
  },
}
</script>

<style scoped>
.github-projects,
.github-repositories {
  flex-wrap: wrap;
}

.github-projects h3,
.github-projects h4 {
  text-transform: uppercase;
}

.github-projects h3 {
  flex-basis: 100%;
}

.github-projects h4 {
  color: var(--color-gray-400);
  font-size: var(--text-sm);
  margin: 10px 0 15px 0;
}

.github-repositories {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 1024px) {
  .github-projects {
    padding: 18px;
  }
}
</style>
