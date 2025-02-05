<template>
  <div class="posts-list container">
    <h3 id="posts-heading">Latest Posts</h3>
    <PostPreview
v-for="article in topRecentArticles" :key="article.id" :title="article.title"
      :date="new Date(article.date)" :href="article.path" :article-id="article.articleId" />
    <Button id="view-all-posts" variant="outline" href="/articles" aria-labelledby="view-all-posts posts-heading">View
      all</Button>
  </div>
</template>

<script setup>
import { useArticles } from '@/composables/useArticles';

const limit = 4
const articles = useArticles()
const topRecentArticles = articles.value?.slice(0, limit)
</script>

<style scoped>
.posts-list {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  width: min(160ch, 100% - 2rem);

  & #posts-heading {
    text-transform: uppercase;
    flex-basis: 100%;
  }
}
</style>
