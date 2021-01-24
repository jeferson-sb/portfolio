import DefaultLayout from '~/layouts/Default.vue'

import '~/assets/styles/reset.css'
import '~/assets/styles/global.css'

export default (Vue, { appOptions, head }) => {
  Vue.component('Layout', DefaultLayout)

  head.meta.push({
    name: 'google-site-verification',
    content: process.env.GOOGLE_SEARCH_CONSOLE_TOKEN,
  })
}
