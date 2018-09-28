<template>
  <div id="create-video">
    <!-- <class-room-navbar :navs="navs"/>  -->
    <b-container>
      <video-form class="mt-5"/>
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
    return {};
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
