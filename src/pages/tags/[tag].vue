<template>
  <ParticlesBackground />
  <div class="hero">
    <div class="container">
      <h1 class="hero__headline"><span class="tag">{{ tag }}</span> Articles</h1>
    </div>
  </div>
  <section id="main-content" class="container collection">
    <PostPreview v-for="article in allArticles" :key="article.id" :title="article.title" :date="new Date(article.date)"
      :href="article.path" :article-id="article.articleId" :excerpt="article.excerpt" :tags="article.tags"
      size="long" />
  </section>
</template>

<script setup>
import { useArticles } from '@/composables/useArticles'

const { params } = useRoute()
const tag = params?.tag

const allArticles = useArticles({ tag });
</script>

<style scoped>
.hero {
  background-color: var(--accent-color-lighter, var(--color-gray-800));
  box-shadow: var(--elevation-2);
}

.hero__headline {
  font-size: var(--text-2xl);
}

.hero__description {
  font-size: var(--text-lg);
  max-width: 50em;
}

.hero .container {
  padding: calc(2rem + 1vw) 0;
}

.tag {
  padding: 0.25rem 1.125rem;
  border-radius: var(--radius-default);
  background-color: var(--color-gray-700);
}

.collection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(380px, 100%), 1fr));
  gap: 1rem;
  padding: 1.2rem 0;
}
</style>
