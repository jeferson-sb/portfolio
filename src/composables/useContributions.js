import { computed } from 'vue'
import { useQuery } from '@urql/vue'

const pullRequestQuery = `
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
`

export function useContributions() {
  const { data } = useQuery({
    query: pullRequestQuery,
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

  return pullRequests
}