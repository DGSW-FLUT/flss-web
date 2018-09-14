import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login")
    },
    {
      path: "/",
      name: "inner-app",
      component: () => import("./views/InnerApp"),
      children: [
        {
          path: "/",
          name: "select-class",
          component: () => import("./views/SelectClass")
        },
        {
          path: "*",
          rediect: "/"
        }
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (store.getters.isAuthenticated || to.path === "/login") {
    next();
    return;
  }
  next("/login");
});

export default router;
