<template>
  <section class="github-projects container">
    <h3>Open Source</h3>
    <h4>Latest contributions</h4>
    <div class="github-repositories">
      <GithubRepoCard
        v-for="pr in pullRequests"
        :key="pr.node.id"
        :pullRequest="pr.node"
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
  computed: {
    pullRequests() {
      return this.$static.userInfo.user.pullRequests.edges.filter(
        (pr, i, arr) => {
          const isFork = pr.node.isCrossRepository
          const isRecent = new Date(pr.node.createdAt) >= this.lastThreeMonths
          const nonDuplicate =
            arr.findIndex(
              (x) => x.node.repository.id === pr.node.repository.id
            ) === i
          return isFork && isRecent && nonDuplicate
        }
      )
    },
    lastThreeMonths() {
      const d = new Date()
      d.setMonth(d.getMonth() - 3)
      return d
    },
  },
}
</script>

<static-query>
query {
  userInfo {
    user(login: "jeferson-sb") {
      pullRequests(last: 100, orderBy: { field: CREATED_AT, direction: DESC }) {
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
}
</static-query>

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
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  width: 100%;
}

@media screen and (max-width: 1024px) {
  .github-projects {
    padding: 18px;
  }
}
</style>
