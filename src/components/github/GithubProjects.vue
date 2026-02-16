<template>
  <section class="github-projects container">
    <h3>Open Source</h3>
    <p class="subtitle">
      List of contributions (PRs) that I've made in recent years. I am always engaged to do more and have an admiration
      for
      the Open Source community.
    </p>
    <div v-if="repositories?.length" class="github-repositories">
      <GithubRepoCard v-for="r in repositories" :key="r.nameWithOwner" :repository="r" />
    </div>
    <GithubCardEmpty v-else />
  </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { useContributions } from '@/composables/useContributions';

const GithubRepoCard = defineAsyncComponent({
  loader: () => import('@/components/github/GithubRepoCard.vue'),
  loadingComponent: '<p>Loading...</p>',
})

const repositories = useContributions();
</script>

<style scoped>
.github-projects {
  &> :is(h3, .subtitle) {
    flex-basis: 100%;
  }

  & h3 {
    text-transform: uppercase;
  }

  & .subtitle {
    font-size: clamp(var(--text-base), 1vw + var(--text-base), var(--text-lg));
    color: var(--color-silver-600);
    margin-block-end: 1rem;
  }
}

.github-projects,
.github-repositories {
  flex-wrap: wrap;
}

.github-repositories {
  --github-card-size: 270px;

  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(var(--github-card-size), 1fr));
  width: 100%;
}
</style>
