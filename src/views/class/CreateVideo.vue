<template>
  <div id="create-video">
    <!-- <class-room-navbar :navs="navs"/>  -->
    <b-container>
      <video-form class="mt-5" :quizs="quizs"/>
    </b-container>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";
import ClassRoomNavbar from "@/components/ClassRoomNavbar";
import VideoForm from "@/components/VideoForm";

export default {
  name: "create-video",
  data() {
    return {
      navs: [],
      quizs: ["1번문항", "2번문항", "3번문항", "4번문항", "5번문항"],
      showQuiz: false
    };
  },
  components: {
    MainNavbar,
    ClassRoomNavbar,
    VideoForm
  }
};
</script>

<style>
</style>
