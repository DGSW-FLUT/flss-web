<template>
  <div id="class-view">
    <class-navbar :menus="menus" />
    <router-view />
  </div>
</template>

<script>
import ClassNavbar from "@/components/ClassNavbar";

export default {
  name: "class-view",
  components: {
    ClassNavbar
  },
  data() {
    return {
      menus: [
        {
          link: "/createvideo",
          text: "영상 제작"
        },
        {
          link: "/makeclass",
          text: "수업 설계"
        },
        {
          link: "/",
          text: "수업 자료"
        },
        {
          link: "/interaction",
          text: "상호 작용"
        },
        {
          link: "/prize",
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
        }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>
