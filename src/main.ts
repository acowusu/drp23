import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as firebase from "firebase/app";
import "firebase/storage";

firebase.initializeApp({
  apiKey: "AIzaSyAZ-4dltXCdUP-8xOdkZ9NZ12Qpk96iMQg",
  authDomain: "drp18-4ef46.firebaseapp.com",
  projectId: "drp18-4ef46",
  storageBucket: "drp18-4ef46.appspot.com",
  messagingSenderId: "21161325016",
  appId: "1:21161325016:web:5107d6d36b44204e3c82ad",
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const InstantSearch = require("vue-instantsearch/vue3/es");

createApp(App).use(store).use(router).use(InstantSearch).mount("#app");
