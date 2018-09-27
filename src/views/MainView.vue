<template>
  <div id="main-view">
    <main-navbar :menus="menus" class="border-bottom" />
    <router-view />
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";

export default {
  name: "main-view",
  components: {
    MainNavbar
  },
  data() {
    return {
      menus: [
        {
          link: "/",
          text: "영상 제작"
        },
        {
          link: "/",
          text: "메뉴 1"
        },
        {
          link: "/interaction",
          text: "상호 작용"
        },
        {
          link: "/",
          text: "보상 도구"
        },
        {
          link: "/",
          text: "지원 도구"
        },
        {
          link: "/",
          text: "평가 도구"
        },
        {
          link: "/",
          text: "학습 자료"
        },
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
