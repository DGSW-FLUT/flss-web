<template>
  <div id="class-view">
    <class-navbar :menus="menus" class="border-bottom shadow-sm" />
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
          link: "/class1",
          text: "Home"
        },
        {
          link: "/class1/select",
          text: "영상 제작"
        },
        {
          link: "/class1/makeclass",
          text: "수업 설계"
        },
        {
          link: "/class1/library",
          text: "자료실"
        },
        {
          link: "/class1/interaction",
          text: "상호 작용"
        },
        {
          link: "/class1/prize",
          text: "보상 도구"
        },
        {
          link: "/class1",
          text: "평가 도구"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>
