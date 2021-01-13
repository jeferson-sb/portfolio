import DefaultLayout from '~/layouts/Default.vue';

import '~/assets/styles/reset.css';
import '~/assets/styles/global.css';

export default (Vue, { appOptions, head }) => {
  Vue.component('Layout', DefaultLayout);

  head.link.push({
    rel: 'icon',
    sizes: '16',
    href: '@/assets/icons/favicon-16x16.png',
  });
  head.link.push({
    rel: 'icon',
    sizes: '32',
    href: '@/assets/icons/favicon-32x32.png',
  });
  head.meta.push({
    name: 'google-site-verification',
    content: process.env.GOOGLE_SEARCH_CONSOLE_TOKEN,
  });
}
