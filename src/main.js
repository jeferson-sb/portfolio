import DefaultLayout from "~/layouts/Default.vue";

import AOS from "aos";
import "aos/dist/aos.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faDev } from "@fortawesome/free-brands-svg-icons/faDev";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";

import "~/assets/scss/main.scss";

export default function(Vue, { head }) {
  library.add(
    faGithub,
    faLinkedin,
    faDev,
    faEye,
    faExternalLinkAlt,
    faPaperPlane
  );
  Vue.component("fa-icon", FontAwesomeIcon);
  Vue.component("Layout", DefaultLayout);
  if (process.isClient) {
    AOS.init();
  }
}
