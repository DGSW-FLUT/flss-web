import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login")
    },
    {
      path: "/classting_handle",
      name: "classting-handle",
      component: () => import("./views/handler/ClasstingHandler")
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
          path: "class1",
          name: "class-view",
          component: () => import("./views/class/ClassView"),
          children: [
            {
              path: "/",
              name: "class-home",
              component: () => import("./views/class/ClassHome")
            },
            {
              path: "classlist",
              name: "classlist",
              component: () => import("./views/class/ClassList")
            },
            {
              path: "interaction",
              name: "interaction",
              component: () => import("./views/class/Interaction")
            },
            {
              path: "portfolio",
              name: "interaction",
              component: () => import("./views/class/Portfolio")
            },
            {
              path: "select",
              name: "select",
              component: () => import("./views/class/Select")
            },
            {
              path: "createvideo",
              name: "createvideo",
              component: () => import("./views/class/CreateVideo")
            },
            {
              path: "createquiz",
              name: "createquiz",
              component: () => import("./views/class/CreateQuiz")
            },
            {
              path: "makeclass",
              name: "makeclass",
              component: () => import("./views/class/MakeClass")
            },
            {
              path: "mypage",
              name: "mypage",
              component: () => import("./views/class/MyPage")
            },
            {
              path: "prize",
              name: "prize",
              component: () => import("./views/class/Prize")
            },
            {
              path: "library",
              name: "library",
              component: () => import("./views/class/Library")
            },
            {
              path: "evaluation",
              name: "evaluation",
              component: () => import("./views/class/Evaluation")
            },
            {
              path: "lesson",
              name: "lesson",
              component: () => import("./views/class/Lesson")
            },
            {
              path: "design-list",
              name: "designlist",
              component: () => import("./views/class/DesignClassList")
            },
            {
              path: "*",
              redirect: "/"
            }
          ]
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
  if (store.getters.getToken !== "" || to.path === "/login") {
    next();
    return;
  }
  alert("정의되지 않은 동작입니다.");
  next("/login");
});

export default router;
