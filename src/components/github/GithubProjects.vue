<template>
  <section class="github-projects container">
    <h3>Open Source</h3>
    <h4>Latest contributions <small>(monthly updated)</small></h4>
    <div class="github-repositories" v-if="pullRequests?.length">
      <GithubRepoCard
        v-for="pr in pullRequests"
        :key="pr.node.id"
        :repository="pr.node.repository"
        :url="pr.node.url"
        :number="pr.node.number"
      />
    </div>
    <GithubCardEmpty v-else />
  </section>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useQuery } from '@urql/vue'

const GithubRepoCard = defineAsyncComponent({
  loader: () => import('@/components/github/GithubRepoCard.vue'),
  loadingComponent: '<p>Loading...</p>',
})
const { data } = useQuery({
  query: `
  query {
    user(login: "jeferson-sb") {
      pullRequests(first: 100, orderBy: { field: CREATED_AT, direction: DESC }, states: [OPEN, MERGED]) {
        edges {
          node {
            id
            number
            url
            createdAt
            isCrossRepository
            repository {
              id
              isPrivate
              nameWithOwner
              url
              description
              primaryLanguage {
                name
              }
            }
          }
        }
      }
    }
  }
`,
})

const lastThreeMonths = () => {
  const today = new Date()
  today.setMonth(today.getMonth() - 3)
  return today
}

const pullRequests = computed(() =>
  data.value?.user?.pullRequests?.edges?.filter((pr, index, arr) => {
    const isFork = pr.node.isCrossRepository
    const isRecent = new Date(pr.node.createdAt) >= lastThreeMonths()
    const nonDuplicate =
      arr.findIndex((x) => x.node.repository.id === pr.node.repository.id) ===
      index
    return isFork && isRecent && nonDuplicate
  })
)
</script>

<style scoped>
.github-projects,
.github-repositories {
  flex-wrap: wrap;
}

.github-projects h3,
.github-projects h4 {
  flex-basis: 100%;
  text-transform: uppercase;
}

.github-projects h4 {
  color: var(--color-gray-400);
  font-size: var(--text-sm);
  margin: 10px 0 15px 0;
}

.github-repositories {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  width: 100%;
}

@media screen and (max-width: 1024px) {
  .github-projects {
    padding: 18px;
  }
}
</style>
