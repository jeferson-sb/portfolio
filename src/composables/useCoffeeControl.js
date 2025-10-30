import { onMounted, watch } from 'vue'
import { event } from 'vue-gtag'

import { isProd } from '@lib/modes'
import debounce from '@lib/handling/debounce'
import { getVisitorId } from '@lib/visitor/getVisitorId'
import { useCoffeeStore } from '@/composables/useCoffeeStore'

export function useCoffeeControl({ articleId, articleUrl }) {
  if (!articleId && !articleUrl) {
    throw new Error('Article url and id are required')
  }

  const { coffee, addCoffeePoints } = useCoffeeStore()
  const points = ref(0)
  const visitor = ref('')

  const allCupsCoffee = computed(() => {
    return coffee.value.reduce((total, coffeeCup) => {
      const articlePoints = coffeeCup.articles[articleId]?.points
      return articlePoints ? articlePoints + total : total
    }, points.value)
  })

  onMounted(async () => {
    try {
      const visitorId = await getVisitorId()
      const visitorDoc = coffee.value.find((coff) => coff.id === visitorId)
      const visitorGivenPoints = visitorDoc?.articles[articleId]?.points

      visitor.value = visitorId
      points.value = visitorGivenPoints || 0
    } catch (error) {
      console.error(error)
    }
  })

  const onPointsWatch = debounce(async () => {
    if (isProd) {
      await addCoffeePoints({
        articleId,
        points: points.value,
        visitorId: visitor.value,
      })
      event('coffee_click', { article: articleUrl })
    }
  }, 400)

  watch(points, onPointsWatch)

  return {
    points,
    allCupsCoffee,
  }
}
