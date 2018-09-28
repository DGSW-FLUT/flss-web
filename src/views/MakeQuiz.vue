<template>
  <div id="make-quiz">
    <b-container class="mt-5">
      <b-row>
        <b-col cols="6">
          <label for="inputLive">영상 미리보기</label>
          <b-embed type="iframe"
           aspect="16by9"
           src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
           allowfullscreen
          ></b-embed>
        </b-col>
        <b-col class="mt-4">
          <b-card
                  tag="article"
                  style= "float:right;"
                  class="mb-2">
            <p class="m-5">퀴즈를 추가해주세요.</p>
            <p class="mt-5">
              <b-button style="float:left; min-width:100px;" @click="showquiz()" variant="primary">출제하기</b-button>
            </p>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-4" >
        <b-col cols="5" v-if="quizbool">
          <b-form-input
            class="mb-3"
            type="text"
            placeholder="문제를 내주세요." />
            <b-input-group  v-for="(quiz, i) in quizs" :key="i">
              <b-input-group-prepend is-text>
                  <input type="radio" name="quiz" :value="i+1">
              </b-input-group-prepend>
              <b-form-input type="text" :placeholder="quiz" />
            </b-input-group>
        </b-col>
      </b-row>
      <router-link to="/main">
          <b-button style="float:right; margin-top:20%;" size="lg" variant="success">Upload!</b-button>
      </router-link>
    </b-container>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";
import ClassRoomNavbar from "@/components/ClassRoomNavbar";
export default {
  name: "make-quiz",
  data() {
    return {
      quizs : ['1번문항', '2번문항', '3번문항', '4번문항', '5번문항'],
      quizbool : false
    };
  },
  components: {
    MainNavbar,
    ClassRoomNavbar
  },
  methods: {
    alert() {
      alert("Success!");
    },
    showquiz(){
      this.quizbool = !this.quizbool
    }
  }
};
</script>

<style>
</style>
