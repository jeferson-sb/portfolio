import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

import '@/assets/styles/reset.css'
import '@/assets/styles/global.css'
import '@/assets/styles/markdown.css'
import '@/assets/styles/utility.css'

const routes = setupLayouts(generatedRoutes)

console.log(
  `%c⚠️ I hope you know what you're doing! :p`,
  'color: #c9a43e; background: #303030; border-radius: 4px; padding: 0.25rem; font-family: cursive; font-style: italic; font-weight: 700;'
)

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob('./modules/*.js', { eager: true })).forEach(
      (i) => i.install?.(ctx)
    )
  }
)
