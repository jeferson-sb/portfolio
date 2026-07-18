import { nextTick } from 'vue'

export const install = ({ isClient, router }) => {
  if (!isClient) return

  let finishTransition

  router.beforeResolve((to, from) => {
    if (
      to.path === from.path ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    return new Promise((resolve) => {
      document.startViewTransition(() => {
        resolve()
        return new Promise((r) => { finishTransition = r })
      })
    })
  })

  router.afterEach(() => {
    if (!finishTransition) return

    nextTick(() => {
      finishTransition()
      finishTransition = null
    })
  })
}
