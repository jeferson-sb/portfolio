<template>
  <ParticlesBackground />
  <ArticlesHero />
  <section id="main-content" class="container collection">
    <PostPreview v-for="article in allArticles" :key="article.id" :title="article.title" :date="new Date(article.date)"
      :href="article.path" :article-id="article.articleId" :excerpt="article.excerpt" :tags="article.tags"
      size="long" />
  </section>
</template>

<script setup>
import config from '@/config/siteconfig.json'

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
    { property: 'og:url', content: `${config.siteUrl}${path}` },
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));
  gap: 1rem;
  padding: 1.2rem 0;
}
</style>
