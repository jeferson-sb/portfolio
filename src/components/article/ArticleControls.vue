<template>
  <div class="article-controls">
    <a href="/articles">View other articles</a>
    <ShareButton :link="articleUrl" text="Take a look at this article" />
  </div>
</template>

<script>
export default {
  props: ['articleUrl'],
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
