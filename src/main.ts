import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const InstantSearch = require("vue-instantsearch/vue3/es");

createApp(App).use(store).use(router).use(InstantSearch).mount("#app");
