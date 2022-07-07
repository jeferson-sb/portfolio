<template>
  <div class="article-controls">
    <AppLink to="/articles">View other articles</AppLink>
    <ShareButton :link="articleUrl" />
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
