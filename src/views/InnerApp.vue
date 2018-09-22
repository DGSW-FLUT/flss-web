<template>
  <div id="inner-app">
    <main-navbar :menus="menus" class="border-bottom" />
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
          text: "수업 설계"
        },
        {
          link: "/",
          text: "플립드 러닝 수업 자료"
        },
        {
          link: "/",
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
