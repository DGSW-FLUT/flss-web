<template>
  <div id="class-view">
    <class-navbar :menus="menus" class="border-bottom; shadow-sm;" />
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
  created() {
    switch (this.$store.getters.getUserInfo.role) {
      case "student":
        this.menus = this.teacherMenu;
        break;
      case "teacher":
        this.menus = this.teacherMenu;
    }
  },
  data() {
    return {
      menus: [],
      //선생용 메뉴
      teacherMenu: [
        {
          link: "/class1",
          text: "Home"
        },
        {
          link: "/class1/select",
          text: "사전영상/평가"
        },
        {
          link: "/class1/classlist",
          text: "영상"
        },
        {
          link: "/class1/makeclass",
          text: "수업 설계"
        },
        {
          link: "/class1/design-list",
          text: "수업설계 목록"
        },
        {
          link: "/class1/library",
          text: "교사 자료실"
        },
        {
          link: "/class1/interaction",
          text: "상호 작용 도구"
        },
        {
          link: "/class1/prize",
          text: "보상 도구"
        },
        {
          link: "/class1/evaluation",
          text: "평가 도구"
        },
        {
          link: "/class1/portfolio",
          text: "포트폴리오"
        }
      ],
      //학생용 메뉴
      studentMenu: [
        {
          link: "/class1",
          text: "Home"
        },
        {
          link: "/class1/classlist",
          text: "영상"
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
          link: "/class1/evaluation",
          text: "평가 도구"
        },
        {
          link: "/class1/portfolio",
          text: "포트폴리오"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>
