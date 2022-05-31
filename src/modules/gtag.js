import VueGtag from 'vue-gtag'

export const install = ({ isClient, app }) => {
  if (!isClient) return

  app.use(VueGtag, {
    config: { id: import.meta.env.VITE_GOOGLE_ANALYTICS_ID },
  })
}
