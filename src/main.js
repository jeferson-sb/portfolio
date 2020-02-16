import DefaultLayout from '~/layouts/Default.vue';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faDev } from '@fortawesome/free-brands-svg-icons/faDev';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';

import i18n from './i18n';

import '~/assets/scss/main.scss';

export default function(Vue, { appOptions, head }) {
  library.add(
    faGithub,
    faLinkedin,
    faDev,
    faEye,
    faExternalLinkAlt,
    faPaperPlane
  );
  Vue.component('fa-icon', FontAwesomeIcon);
  Vue.component('Layout', DefaultLayout);

  head.link.push({
    rel: 'icon',
    sizes: '16',
    href: '@/assets/icons/favicon-16x16.png'
  });
  head.link.push({
    rel: 'icon',
    sizes: '32',
    href: '@/assets/icons/favicon-32x32.png'
  });
  head.meta.push({
    name: 'google-site-verification',
    content: process.env.GOOGLE_SEARCH_CONSOLE_TOKEN
  });

  if (process.isClient) {
    AOS.init();
    const langString = navigator.languages || navigator.userLanguage;
    i18n.locale = langString[-1] || langString[0];
    head.htmlAttrs = { lang: langString[1], dir: 'ltr' };
    appOptions.i18n = i18n;
  }
}
