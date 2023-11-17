<template>
  <div class="article-controls">
    <ShareButton :link="articleUrl" />
    <Button circle href="/articles" variant="outline" title="See all articles">
      <template v-slot:icon>
        <PagesSVG />
      </template>
    </Button>
    <CoffeeButton />
    <span class="coffee-counter">{{ formatPoints(allCupsCoffee) }}</span>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { event } from 'vue-gtag'
import { load } from '@fingerprintjs/fingerprintjs'

import debounce from '@lib/handling/debounce'
import { isProd } from '@lib/modes'
import { useCoffeeStore } from '@/composables/useCoffeeStore'

const { articleUrl, articleId } = defineProps(['articleUrl',  'articleId'])

const { coffee, addCoffeePoints } = useCoffeeStore();
const formatPoints = (n) => Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
}).format(n)

const points = ref(0);
const visitor = ref('');
const allCupsCoffee = computed(() => 
  coffee
    .value
    .reduce((total, coffeeCup) => {
      const articlePoints = coffeeCup.articles[articleId]?.points
      return articlePoints ? articlePoints + total : 0
    }, 0)
)

provide('points', points)

onMounted(async () => {
  try {
    const value = await load()
    const { visitorId } = await value.get()
    const visitorDoc = coffee.value.find(coff => coff.id === visitorId)
    const visitorGivenPoints = visitorDoc?.articles[articleId]?.points;

    visitor.value = visitorId
    points.value = visitorGivenPoints || 0
  } catch (error) {}
})

const onPointsWatch = debounce(async () => {
  if (isProd) {
    await addCoffeePoints({ articleId, points: points.value, visitorId: visitor.value })
    event('coffee_click', { article: articleUrl })
  }
}, 400)


watch(points, onPointsWatch)
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
