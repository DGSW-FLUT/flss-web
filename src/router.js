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
      path: "/main",
      name: "main",
      component: () => import("./views/Main")
    },
    {
      path: "/createvideo",
      name: "createvideo",
      component: () => import("./views/CreateVideo")
    },
    {
      path: "/showvideo",
      name: "showvideo",
      component: () => import("./views/MakeQuiz")
    },
    {
      path: "/makeclass",
      name: "makeclass",
      component: () => import("./views/MakeClass")
    },
    {
      path: "/prize",
      name: "prize",
      component: () => import("./views/Prize")
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

// router.beforeEach((to, from, next) => {
//   if (store.getters.isAuthenticated || to.path === "/login") {
//     next();
//     return;
//   }
//   next("/login");
// });

export default router;
