import { createGtag } from 'vue-gtag'

const gtag = createGtag({
  tagId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
})

export const install = ({ isClient, app }) => {
  if (!isClient) return

  app.use(gtag)
}
