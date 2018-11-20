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
        this.menus = this.studentMenu;
        break;
      case "teacher":
        this.menus = this.teacherMenu;
        break;
      default:
        this.menus = this.teacherMenu;
        break;
    }
  },
  data() {
    return {
      menus: [],
      //선생용 메뉴
      teacherMenu: [
        {
          link: "/class",
          text: "Home"
        },
        {
          link: "/class/select",
          text: "사전영상/평가"
        },
        {
          link: "/class/classlist",
          text: "사전영상/평가 목록"
        },
        {
          link: "/class/makeclass",
          text: "수업 설계"
        },
        {
          link: "/class/design-list",
          text: "수업설계 목록"
        },
        {
          link: "/class/library",
          text: "교사 자료실"
        },
        {
          link: "/class/interaction",
          text: "상호 작용 도구"
        },
        {
          link: "/class/prize",
          text: "보상 도구"
        },
        {
          link: "/class/evaluation",
          text: "평가 도구"
        },
        {
          link: "/class/portfolio",
          text: "학습게시판"
        }
      ],
      //학생용 메뉴
      studentMenu: [
        {
          link: "/class",
          text: "Home"
        },
        {
          link: "/class/select",
          text: "사전영상/평가"
        },
        {
          link: "/class/classlist",
          text: "사전영상/평가 목록"
        },
        // {
        //   link: "/class/library",
        //   text: "자료실"
        // },
        {
          link: "/class/interaction",
          text: "상호 작용"
        },
        {
          link: "/class/prize",
          text: "칭찬 현황"
        },
        {
          link: "/class/portfolio",
          text: "학습게시판"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>
