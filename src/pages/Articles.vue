<template>
  <Layout>
    <main>
      <div class="hero">
        <div class="container">
          <h1 class="hero__headline">Articles</h1>
          <p class="hero__description">
            Here you can find all of my published articles, tutorials and
            guides, going from little css tips to software architecture, open
            source, user experience and all sort of things. I hope you enjoy
            you're reading 📖👋
          </p>
        </div>
      </div>
      <section class="container">
        <PostPreview
          v-for="post in allPosts"
          :key="post.node.id"
          :title="post.node.title"
          :date="new Date(post.node.published_at)"
          :href="`/articles/${post.node.slug}`"
          :articleId="`article-${post.node.id}`"
          :excerpt="post.node.excerpt"
          :tags="post.node.tags"
          size="long"
        />
      </section>
    </main>
  </Layout>
</template>

<script>
import PostPreview from '@/components/posts/PostPreview.vue'

export default {
  components: {
    PostPreview,
  },
  metaInfo() {
    return {
      title: 'Articles',
    }
  },
  computed: {
    allPosts() {
      return this.$page.articles.edges
    },
  },
}
</script>

<page-query>
query {
	articles: allArticles(sortBy: "published_at") {
    edges {
      node {
        id
        title
        published_at
        slug
        excerpt
        tags
      }
    }
  }
}
</page-query>

<style scoped>
.container {
  padding: 1.2rem 0;
}

.hero {
  background-color: var(--accent-color-lighter, var(--color-gray-800));
  box-shadow: var(--elevation-2);
}

body[data-theme='light'] .hero {
  box-shadow: var(--elevation-3);
}

.hero .container,
.hero + .container {
  flex-flow: column wrap;
}

.hero .container {
  padding: calc(2rem + 1vw) 0;
}

.hero__headline {
  font-size: var(--text-2xl);
}

.hero__description {
  font-size: var(--text-lg);
  max-width: 800px;
}

@media screen and (max-width: 768px) {
  .container,
  .hero .container {
    padding: 1rem 2.4rem;
  }
}

@media screen and (max-width: 425px) {
  .hero + .container {
    padding: 1rem;
  }
}
</style>
