<template>
  <div class="posts-list container">
    <div v-for="group in groupedArticles" :key="group.year" class="posts-list__group">
      <h3 class="posts-list__year">{{ group.year }}</h3>
      <div class="posts-list__items">
        <PostPreview v-for="article in group.items" :key="article.id" :title="article.title"
          :date="new Date(article.date)" :href="article.path" :article-id="article.articleId" />
      </div>
    </div>
    <Button id="view-all-posts" variant="outline" href="/articles" aria-labelledby="view-all-posts posts-heading">View
      all</Button>
  </div>
</template>

<script setup>
import { useArticles } from '@/composables/useArticles';

const limit = 8
const articles = useArticles()
const topRecentArticles = articles.value?.slice(0, limit) ?? []

const groupedArticles = (() => {
  const byYear = new Map()

  for (const article of topRecentArticles) {
    const year = new Date(article.date).getFullYear()
    if (!byYear.has(year)) byYear.set(year, [])
    byYear.get(year).push(article)
  }

  return Array.from(byYear, ([year, items]) => ({ year, items }))
})()
</script>

<style scoped>
.posts-list {
  display: flex;
  flex-flow: column;
  width: min(160ch, 100% - 2rem);
  margin-block-end: clamp(3rem, 6vw, 6rem);
}

.posts-list__group + .posts-list__group {
  margin-block-start: clamp(2rem, 4vw, 3rem);
}

.posts-list__year {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  color: var(--color-gray-500);
  margin-block-end: 1rem;
}

.posts-list__items {
  display: flex;
  flex-flow: column;
  gap: 0.75rem;
}

#view-all-posts {
  align-self: flex-start;
  margin-block-start: clamp(2rem, 4vw, 3rem);
}
</style>
