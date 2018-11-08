<template>
  <div id="create-video">
    <!-- <class-room-navbar :navs="navs"/>  -->
    <b-container fluid>
      <b-row class="mt-5">
        <b-col style="cursor:pointer" md="4" offset-md="2" sm="6" offset-sm="0">
          <b-card bg-variant="light"
                header="사전 영상"
                @click="goVideo()"
                class="text-center">
            <p class="card-text">바로가기</p>
          </b-card>
        </b-col>
        <b-col style="cursor:pointer" md="4" sm="6">
          <b-card bg-variant="light"
                header="평가 퀴즈"
                @click="goQuiz()"
                class="text-center">
            <p class="card-text">바로가기</p>
          </b-card>
        </b-col>
        <b-col md="2" sm="4" offset-md="0" offset-sm="4">
          <b-card>
          사전영상/ 평가 메뉴 안내 <br><br>
          사전 영상과 함께 평가문항을<br>
          출제하는 경우 '사전<br>
          영상+평가'을 선택해주세요.<br><br>
          교실 수업 중 형성평가와 같이<br>
          영상이 없이 평가 문항만<br>
          출제할 경우 '평가'를<br>
          선택해주세요.
          </b-card>
        </b-col>
      </b-row>
      <!-- <video-form class="mt-5"/> -->
    </b-container>
   
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";
import ClassRoomNavbar from "@/components/ClassRoomNavbar";

export default {
  name: "select",
  data() {
    return {};
  },
  components: {
    MainNavbar,
    ClassRoomNavbar
  },
  methods: {
    goVideo() {
      this.$store.commit("setType", "before");
      this.$router.push({ path: "/class/CreateVideo" });
    },
    goQuiz() {
      this.$store.commit("setType", "after");
      this.$router.push({ path: "/class/CreateQuiz" });
    }
  }
};
</script>

<style>
</style>
