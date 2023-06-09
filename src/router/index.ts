import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SearchView from "../views/SearchView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/subscriptions",
    name: "subscriptions",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "sub" */ "../views/SubscriptionView.vue"),
  },
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
    children: [
      {
        path: "/create",
        name: "create",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "create" */ "../views/CreateView.vue"),
      },
    ],
  },
  {
    path: "/society/:society_id",
    name: "society",
    component: () =>
      import(/* webpackChunkName: "event" */ "../views/SocietyView.vue"),
  },
  {
    path: "/account",
    name: "Account",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/AccountView.vue"),
  },
  {
    path: "/messages",
    name: "Messages",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "account" */ "../views/AnnouncemnetsView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
