import { computed } from 'vue'
import { useRouter } from 'vue-router'

export function useArticles(options) {
  const router = useRouter()
  const tag = options?.tag

  const articles = computed(() => {
    return router
      .getRoutes()
      .filter((route) => {
        const isArticle = route.path.startsWith('/articles/') && route.name
        const tags = route.meta?.frontmatter?.tags

        if (tag) {
          const normalizedTags = tags ? tags.toLowerCase() : ''
          const matchTag = normalizedTags.indexOf(tag.toLowerCase()) !== -1

          return isArticle && matchTag
        }

        return isArticle
      })
      .sort((a, b) =>
        a.meta.frontmatter.published_at < b.meta.frontmatter.published_at
          ? 1
          : -1
      )
      .map((article) => ({
        id: article.meta?.frontmatter?.id,
        articleId: article.name,
        title: article.meta?.frontmatter?.title,
        date: article.meta?.frontmatter?.published_at,
        path: article.path,
        excerpt: article.meta?.frontmatter?.excerpt,
        tags: article.meta?.frontmatter?.tags,
      }))
  })

  if (tag && !articles.value.length) router.push('/404')

  return articles
}
