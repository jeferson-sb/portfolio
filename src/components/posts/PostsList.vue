<template>
  <div class="posts-list container">
    <h3>Latest Posts</h3>
    <PostPreview
      v-for="{ title, created_at } in dummyPosts"
      :key="title"
      :title="title"
      :date="created_at"
    />
  </div>
</template>

<script>
import PostPreview from './PostPreview.vue'

export default {
  components: {
    PostPreview,
  },
  data() {
    return {
      dummyPosts: [
        { title: 'What is CSS Houdini?', created_at: new Date() },
        {
          title: 'Awesome DevTools features',
          created_at: new Date(2020, 12, 22),
        },
        {
          title: 'Vue 3.0 is finally released!',
          created_at: new Date(2020, 10, 25),
        },
      ],
    }
  },
}
</script>

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
