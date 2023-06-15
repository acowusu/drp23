import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar as farFaStar,
  faThumbsUp as farFaThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import {
  faStar as fasFaStar,
  faThumbsUp as fasFaThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

library.add(fasFaStar, farFaStar, farFaThumbsUp, fasFaThumbsUp);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const InstantSearch = require("vue-instantsearch/vue3/es");

createApp(App)
  .use(store)
  .use(router)
  .use(InstantSearch)
  .component("QuillEditor", QuillEditor)
  .mount("#app");
