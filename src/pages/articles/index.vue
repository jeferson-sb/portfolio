<template>
  <main class="main" ref="main">
    <ArticlesHero />
    <section class="container" id="main-content">
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
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const title = 'Articles • Jeferson S. Brito'
const description =
  'Here you can find all of my articles, tutorials and guides, going from little css tips to software architecture, open source, user experience and so on'

const main = ref(null)

const { path } = useRoute()
const { getRoutes } = useRouter()
const allArticles = computed(() =>
  getRoutes()
    .filter((route) => route.path.startsWith('/articles/') && route.name)
    .sort((a, b) =>
      a.meta.frontmatter.published_at < b.meta.frontmatter.published_at ? 1 : -1
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
)

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
const handleScrollChange = () => {
  let timeout

  main?.value?.style?.setProperty('--state', 'running')

  window.clearTimeout(timeout)

  timeout = setTimeout(() => {
    main?.value?.style?.setProperty('--state', 'paused')
  }, 2000)
}

onMounted(() => {
  window.addEventListener('scroll', handleScrollChange)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollChange)
})
</script>

<style scoped>
.container {
  padding: 1.2rem 0;
}

.hero + .container {
  flex-flow: column wrap;
}

.main {
  --state: paused;
  --bg-pattern: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%2323262a' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23828b97'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");

  background-color: var(--color-light, --color-default-black);
  background-image: var(--bg-pattern);
  animation: shuffle 15s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate;
  animation-play-state: var(--state);
  will-change: background-position;
}

body[data-theme='light'] .main {
  --bg-pattern: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23babec5' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23828b97'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
}

@keyframes shuffle {
  0% {
    background-position: 0% 0%;
  }

  25% {
    background-position: bottom;
  }

  35% {
    background-position: center;
  }

  50% {
    background-position: left;
  }

  75% {
    background-position: top;
  }

  100% {
    background-position: right;
  }
}

@media screen and (max-width: 768px) {
  .container {
    padding: 1rem 2.4rem;
  }
}

@media screen and (max-width: 425px) {
  .hero + .container {
    padding: 1rem;
  }
}
</style>
