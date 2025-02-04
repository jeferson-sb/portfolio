<template>
  <div class="book"></div>
</template>

<style scoped>
.book {
  --transition: transform 800ms ease;
  --origin: initial;

  position: relative;
  width: var(--w, 8rem);
  height: var(--h, 12rem);
  background-image: url('@/assets/posts/book_cover.jpeg');
  background-size: cover;
  backface-visibility: hidden;
  margin-block: 1rem 2rem;
  transition: var(--transition);
  transform-origin: var(--origin);
  border: 2px solid hsl(0deg 0% 19%);
  outline: 6px solid hsl(0deg 0% 96%);
}

.book:hover {
  transform: rotate(-10deg) scale(1.2);
}
</style>