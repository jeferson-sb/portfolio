import { computed } from 'vue'
import { useQuery } from '@urql/vue'

const contributedReposQuery = `
  query {
    search(query: "author:jeferson-sb type:pr is:merged -user:jeferson-sb", type: ISSUE, first: 100) {
      issueCount
      nodes {
        ... on PullRequest {
          repository {
            nameWithOwner
            url
            description
            isPrivate
            stargazerCount
            primaryLanguage {
              name
            }
            owner {
              login
            }
          }
        }
      }
    }
  }
`

export function useContributions() {
  const excludeList = [
    'bradtraversy/vanilla-parcel-boilerplate',
    'bradtraversy/design-resources-for-developers',
    'denolib/awesome-deno',
    'is-a-dev/register',
    'talyssonoc/node-api-boilerplate',
    'Evavic44/portfolio-ideas',
  ]
  const { data } = useQuery({
    query: contributedReposQuery,
  })

  const repos = computed(() => {
    const seen = new Set()
    const unique = []
    const nodes = data?.value?.search.nodes || []

    for (const { repository } of nodes) {
      if (excludeList.indexOf(repository.nameWithOwner) !== -1) continue
      if (!seen.has(repository.nameWithOwner)) {
        seen.add(repository.nameWithOwner)
        unique.push(repository)
      }
    }

    return unique
  })

  return repos
}
