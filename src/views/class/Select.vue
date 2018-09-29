<template>
  <div id="create-video">
    <!-- <class-room-navbar :navs="navs"/>  -->
    <b-container>
      <b-row class="mt-5">
        <b-col style="cursor:pointer" >
          <b-card bg-variant="light"
                header="사전 영상"
                @click="goVideo()"
                class="text-center">
            <p class="card-text">바로가기</p>
          </b-card>
        </b-col>
        <b-col style="cursor:pointer" >
          <b-card bg-variant="light"
                header="평가 퀴즈"
                @click="goQuiz()"
                class="text-center">
            <p class="card-text">바로가기</p>
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
      this.$router.push({ path: "/class1/CreateVideo" });
    },
    goQuiz() {
      this.$router.push({ path: "/class1/CreateQuiz" });
    }
  }
};
</script>

<style>
</style>
