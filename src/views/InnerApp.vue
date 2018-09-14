<template>
  <div id="inner-app">
    <main-navbar :menus="menus" />
    <router-view />
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";

export default {
  name: "inner-app",
  components: {
    MainNavbar
  },
  data() {
    return {
      menus: [
        {
          link: "/",
          text: "가입한 학급"
        },
        {
          link: "/",
          text: "메뉴 1"
        },
        {
          link: "/",
          text: "메뉴 2"
        }
      ]
    };
  },
  methods: {
    logout() {
      this.$store.commit("setAuthenticated", false);
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
