<template>
  <div class="posts-list container">
    <h3 id="posts-heading">Latest Posts</h3>
    <PostPreview
      v-for="article in topRecentArticles"
      :key="article.id"
      :title="article.title"
      :date="new Date(article.date)"
      :href="article.path"
      :articleId="article.articleId"
    />
    <Button
      variant="outline"
      href="/articles"
      id="view-all-posts"
      aria-labelledby="view-all-posts posts-heading"
      >View all</Button
    >
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const { getRoutes } = useRouter()
const limit = 3
const topRecentArticles = computed(() =>
  getRoutes()
    .filter((route) => route.path.startsWith('/articles/') && route.name)
    .sort((a, b) =>
      a.meta.frontmatter.published_at < b.meta.frontmatter.published_at ? 1 : -1
    )
    .slice(0, limit)
    .map((article) => ({
      id: article.meta?.frontmatter?.id,
      articleId: article.name,
      title: article.meta?.frontmatter?.title,
      date: article.meta?.frontmatter?.published_at,
      path: article.path,
      excerpt: article.meta?.frontmatter?.excerpt,
      tags: article.meta?.frontmatter?.tags,
    }))
)
</script>

<style scoped>
.posts-list {
  display: flex;
  flex-flow: row wrap;
}

.posts-list h3 {
  width: 100%;
  text-transform: uppercase;
  margin-bottom: 33px;
}

@media screen and (max-width: 1024px) {
  .posts-list {
    padding: 18px;
  }
}
</style>
