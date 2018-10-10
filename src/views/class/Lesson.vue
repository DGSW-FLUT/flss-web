<template>
  <div id="lesson">
    <b-container>
      <b-card 
              :title="title"
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
                <p>{{ i+1 + "." + quiz.Content}}</p>
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
      quizs : [],
      title : "",
      answer : ""
    };
  },
  created() {
    this.$http.get(`http://flss.kr/api/lesson/showQuestion?lno=${this.$store.getters.getLessonNum}&type=${this.$store.getters.getType}`)
    .then(res =>{
      this.title = res.data[0].Title
      this.answer = res.data[0].Ranswer
    })
    this.$http.get(`http://flss.kr/api/lesson/showQuiz?lno=${this.$store.getters.getLessonNum}&type=${this.$store.getters.getType}`)
    .then(res =>{
      this.quizs = res.data
      console.log("quiz" + this.quizs)
    })
    this.$vuevent.$on("test", function(text) {
      console.log(text);
    });
  }
};
</script>

<style>
</style>
