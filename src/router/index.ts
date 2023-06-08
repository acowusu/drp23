import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SearchView from "../views/SearchView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: SearchView,
  },
  {
    path: "/create",
    name: "create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/CreateView.vue"),
  },
  {
    path: "/today",
    name: "today",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "today" */ "../views/TodayView.vue"),
  },
  {
    path: "/event/:event_id",
    name: "event",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "event" */ "../views/EventView.vue"),
  },
  {
    path: "/myevents",
    name: "myevents",
    component: () => import("../views/MyEventsView.vue"),
  },
  {
    path: "/societyhomepage",
    name: "societyhomepage",
    component: () => import("../views/SocietyHomepage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
