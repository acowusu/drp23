import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
library.add(fasFaStar, farFaStar);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const InstantSearch = require("vue-instantsearch/vue3/es");

createApp(App).use(store).use(router).use(InstantSearch).mount("#app");
