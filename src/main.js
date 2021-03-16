import DefaultLayout from '~/layouts/Default.vue'

import '~/assets/styles/reset.css'
import '~/assets/styles/global.css'
import '~/assets/styles/prism-onedark.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

export default (Vue, { appOptions, head }) => {
  Vue.component('Layout', DefaultLayout)

  // Production-only
  if (process.env.NODE_ENV === 'production') {
    head.script.push({
      src: process.env.ANALYTICS_URL,
      async: true,
      defer: true,
      'data-cache': true,
      'data-website-id': process.env.ANALYTICS_WEBSITE_ID,
    })

    head.meta.push({
      name: 'google-site-verification',
      content: process.env.GOOGLE_SEARCH_CONSOLE_TOKEN,
    })
  }
}
