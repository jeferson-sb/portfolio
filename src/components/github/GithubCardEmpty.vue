<template>
  <div class="card">
    <h4 class="title">No recent contributions just yet.</h4>
    <p class="subtitle">Working on in... 🛠️</p>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-flow: column wrap;
  padding: 1.125rem 1.75rem;
  background-color: var(--bg-color-lighter, var(--color-gray-800));
  border-radius: var(--radius-default);
  outline: 1px dashed var(--color-silver);
  outline-offset: 3px;
}

.title {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
}

.subtitle {
  color: var(--color-gray-300);
}
</style>
