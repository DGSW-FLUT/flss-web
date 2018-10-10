<template>
  <div id="lesson">
    <b-container>
      <b-card 
              :title="this.$store.getters.getLesson.LessonName"
              tag="article"
              class="mt-3 mb-2">
        <p class="card-text">
          {{ this.$store.getters.getLesson.Explain }}
        </p>              
        <b-embed type="iframe"
                aspect="16by9"
                src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                allowfullscreen/>
        <b-card class="mt-4" :header="title">
            <div v-for="(quiz, i) in quizs" :key="i">
              <b-form-radio name="answer" :value="i+1" v-model="answer">
                <p>{{ i+1 + "." + quiz}}</p>
              </b-form-radio>
            </div>
            <b-button variant="primary">제출</b-button> 
        </b-card>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "lesson",
  data() {
    return {
      title: "3+3의 결과로 알맞은 것은?",
      quizs: ["1", "2", "3", "4", "6"],
      answer: ""
    };
  },
  created() {
    this.$vuevent.$on("test", function(text) {
      console.log(text);
    });
  }
};
</script>

<style>
</style>
