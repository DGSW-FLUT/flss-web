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
      path: "/",
      name: "main-view",
      component: () => import("./views/MainView"),
      children: [
        
        {
          path: "/",
          name: "select-class",
          component: () => import("./views/SelectClass")
        },
        {
          path: "/class1",
          name: "class-view",
          component: () => import("./views/class/ClassView"),
          children: [
            {
              path: "/",
              name: "class-home",
              component: () => import("./views/class/ClassHome")
            },
            {
              path: "/interaction",
              name: "interaction",
              component: () => import("./views/Interaction")
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
              path: '*',
              redirect: '/'
            }
          ],
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
