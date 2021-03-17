<template>
  <div class="posts-list container">
    <h3>Latest Posts</h3>
    <PostPreview
      v-for="post in allPosts"
      :key="post.node.id"
      :title="post.node.title"
      :date="new Date(post.node.published_at)"
      :href="`/articles/${post.node.slug}`"
      :articleId="`article-${post.node.id}`"
    />
    <g-link to="/articles" class="button">View all</g-link>
  </div>
</template>

<script>
import PostPreview from './PostPreview.vue'

export default {
  components: {
    PostPreview,
  },
  computed: {
    allPosts() {
      return [...this.$static.posts.edges]
    },
  },
}
</script>

<static-query>
query {
	posts: allArticles(sortBy: "published_at", limit: 3) {
    edges {
      node {
        id
        title
        published_at
        slug
      }
    }
  }
}
</static-query>

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

/* TODO: create dedicated component */
.posts-list .button {
  border-radius: var(--radius-default);
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  text-decoration: none;
  font-weight: 700;
}

@media screen and (max-width: 1024px) {
  .posts-list {
    padding: 18px;
  }
}
</style>
