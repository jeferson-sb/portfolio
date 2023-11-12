<template>
  <GalaxyBackground>
    <ArticlesHero />
    <section class="container collection" id="main-content">
      <PostPreview
        v-for="article in allArticles"
        :key="article.id"
        :title="article.title"
        :date="new Date(article.date)"
        :href="article.path"
        :articleId="article.articleId"
        :excerpt="article.excerpt"
        :tags="article.tags"
        size="long"
      />
    </section>
  </GalaxyBackground>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useArticles } from '@/composables/useArticles'

const title = 'Articles • Jeferson S. Brito'
const description =
  'Here you can find all of my articles, tutorials and guides, going from little css tips to software architecture, open source, user experience and so on'

const { path } = useRoute()
const allArticles = useArticles();

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: `https://jefersonsilva.me${path}` },
    {
      property: 'twitter:title',
      content: title,
    },
    {
      property: 'twitter:description',
      content: description,
    },
  ],
})

</script>

<style scoped>
.collection {
  flex-flow: column wrap;
  gap: 1rem;
  padding: 1.2rem 0;
}
</style>
