<template>
  <div class="article-controls">
    <g-link to="/articles">View other articles</g-link>
    <ShareButton :link="articleUrl" text="Take a look at this article" />
  </div>
</template>

<script>
import ShareButton from '@/components/ui/ShareButton.vue'

export default {
  props: ['articleUrl'],
  components: {
    ShareButton,
  },
}
</script>

<style scoped>
.article-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: min(110ch, 100% - 2rem);
  margin: 0 auto;
  margin-top: 1.125rem;
}
</style>
