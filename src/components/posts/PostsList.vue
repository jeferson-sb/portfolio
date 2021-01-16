<template>
  <div class="posts-list container">
    <h3>Latest Posts</h3>
    <PostPreview
      v-for="edge in $static.posts.edges"
      :key="edge.node.id"
      :title="edge.node.title"
      :date="new Date(edge.node.published_at)"
      :href="`/articles/${edge.node.slug}`"
      :articleId="`article-${edge.node.id}`"
    />
  </div>
</template>

<script>
import PostPreview from './PostPreview.vue'

export default {
  components: {
    PostPreview,
  },
}
</script>

<static-query>
query {
  posts: allArticles(sortBy: "published_at") {
     edges {
      node {
        id,
        title,
        published_at,
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
  font-family: var(--font-title);
  text-transform: uppercase;
  margin-bottom: 33px;
}

@media screen and (max-width: 1024px) {
  .posts-list {
    padding: 18px;
  }
}
</style>
