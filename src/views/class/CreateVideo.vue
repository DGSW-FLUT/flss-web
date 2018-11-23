<template>
  <div id="create-video">
    <!-- <class-room-navbar :navs="navs"/>  -->
    <b-container>
      <test class="mt-5" :video="video"/>
    </b-container>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";
import ClassRoomNavbar from "@/components/ClassRoomNavbar";
import Test from "@/components/Test";

export default {
  name: "create-video",
  data() {
    return {
      video: true
    };
  },
  components: {
    MainNavbar,
    ClassRoomNavbar,
    Test
  },
  methods: {
    test() {
      this.$router.push({ path: "/class" });
    }
  }
};
</script>

<style>
</style>
