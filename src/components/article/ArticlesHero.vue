<template>
  <div class="hero">
    <div class="container">
      <h1 class="hero__headline">Articles</h1>
      <p class="hero__description">
        Here you can find all of my published articles, tutorials and guides,
        going from little css tips to software architecture, open source, user
        experience and all sort of things. I hope you enjoy the reading
        📖👋
      </p>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-color: var(--accent-color-lighter, var(--color-gray-800));
  box-shadow: var(--elevation-2);
}

.hero__headline {
  font-size: var(--text-2xl);
}

.hero__description {
  font-size: var(--text-lg);
  max-width: 800px;
}

.container {
  flex-flow: column wrap;
  padding: calc(2rem + 1vw) 0;
}

body[data-theme='light'] .hero {
  box-shadow: var(--elevation-3);
}

@media (--vw-md) {
  .hero .container {
    padding: 1rem 2.4rem;
  }
}
</style>