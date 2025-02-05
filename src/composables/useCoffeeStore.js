import { useCollection } from 'vuefire'
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore'

import { db } from '@/modules/firebase'

export function useCoffeeStore() {
  const coffeeRef = collection(db, 'coffee')
  const coffee = useCollection(coffeeRef, { once: true })

  const addCoffeePoints = async ({ articleId, points, visitorId }) => {
    if (!articleId || !visitorId) return

    try {
      const userDoc = doc(coffeeRef, visitorId)
      const userCups = coffee.value.find((cup) => cup.id === visitorId)
      const articles = userCups?.articles || {}

      await setDoc(userDoc, {
        articles: {
          ...articles,
          [articleId]: {
            points,
            date: Timestamp.fromDate(new Date()),
          },
        },
      })
    } catch (error) {
      console.error('Failed to set coffee points for visitor', error)
    }
  }

  return { coffee, addCoffeePoints }
}
