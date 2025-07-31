<template>
  <div class="feature-card">
    <div class="card">
      <img src="https://picsum.photos/id/357/300/200" alt="Random image" class="card-image" />
      <div class="content">
        <span class="tag">Featured</span>
        <h2 class="title">Modern Design</h2>
        <p class="description">
          Discover the perfect blend of form and function in our latest collection.
          Each piece tells a unique story of craftsmanship and innovation.
        </p>
        <button class="action-btn">Learn More</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-card {
  container-name: feature-card;
  container-type: inline-size;
}

.card {
  --primary-color: lch(10.63% 8.08 289.58);
  --contrast-color: lch(95% 0 0);
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  background: var(--contrast-color);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.content {
  padding: 2rem;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  border-radius: 0;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: lch(90% 0 0);
  color: var(--primary-color);
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
}

.title {
  margin: 1rem 0;
  color: var(--primary-color);
  font-size: 1.5rem;
}

.description {
  color: var(--primary-color);
  opacity: 0.6;
  line-height: 1.6;
}

.action-btn {
  background: var(--primary-color);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

@container (min-width: 500px) {
  .card {
    grid-template-columns: 1fr 2fr;
  }

}
</style>
