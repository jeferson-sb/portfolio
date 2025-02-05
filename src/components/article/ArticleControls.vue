<template>
  <div class="article-controls">
    <ShareButton :link="articleUrl" />
    <Button circle href="/articles" variant="outline" title="See all articles">
      <template #icon>
        <PagesSVG />
      </template>
    </Button>
    <CoffeeButton />
    <span class="coffee-counter">{{ formatPoints(allCupsCoffee) }}</span>
  </div>
</template>

<script setup>
import { formatPoints } from '@lib/formatters/formatPoints'

const { articleUrl, articleId } = defineProps({
  articleUrl: {
    type: String,
    required: true
  },
  articleId: {
    type: String,
    required: true
  }
})

const { points, allCupsCoffee } = useCoffeeControl({ articleUrl, articleId })

provide('points', points)
</script>

<style scoped>
.article-controls {
  display: flex;
  flex-flow: column wrap;
  position: sticky;
  top: 10%;
  z-index: var(--z-10);
  gap: 1rem;
  height: fit-content;
  width: fit-content;
  min-width: 70px;
  align-items: center;
  border-radius: 1rem;
  padding: 1.25rem 0.75rem;
  background-color: var(--accent-color-lighter, var(--color-gray-800));
  box-shadow: var(--elevation-3);

  .button {
    --button-text-color: var(--text-color-default);

    border-color: var(--text-color-default);
  }
}

.coffee-counter {
  font-family: var(--font-mono);
}

@media (--vw-md) {
  .article-controls {
    position: fixed;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
    flex-flow: row nowrap;
    padding: 0.75rem;
  }

  .coffee-button {
    min-width: 52px;
  }

  .button--rounded-full {
    padding: 0.50rem;
    min-width: 46px;
    min-height: 46px;
  }
}
</style>
