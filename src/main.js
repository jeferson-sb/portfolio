import DefaultLayout from '~/layouts/Default.vue'
import ImgLazy from '~/components/ui/ImgLazy.vue'

import '~/assets/styles/reset.css'
import '~/assets/styles/global.css'
import '~/assets/styles/prism-onedark.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

export default (Vue, { appOptions, head }) => {
  Vue.component('Layout', DefaultLayout)
  Vue.component('ImgLazy', ImgLazy)

  // Production-only
  if (process.env.NODE_ENV === 'production') {
    head.meta.push({
      name: 'google-site-verification',
      content: process.env.GOOGLE_SEARCH_CONSOLE_TOKEN,
    })
  }
}
