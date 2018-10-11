<template>
  <div id="lesson">
    <b-container>
      <b-card 
            tag="article"
              class="mt-3 mb-2">
        <h3>{{ this.$store.getters.getLesson.LessonName }}</h3>
        <p class="card-text">
          {{ this.$store.getters.getLesson.Explain }}
        </p>              
        <embed  v-if="this.$store.getters.getLesson.File"
               :src="'http://flss.kr/video/'+this.$store.getters.getLesson.File" controls allowfullscreen
                width="1000"
                height="565">
        <b-card class="mt-4" :header="title">
            <div v-for="(quiz, i) in quizs" :key="i">
              <div class="mt-3 mb-3">
                <input type="radio" name="answer" :value="i+1" v-model="userAnswer">
                <span>{{ i+1 + "." + quiz.Content}}</span>
              </div>
            </div>
            <b-button variant="primary" @click="checkAnswer()">제출</b-button> 
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
      quizs: [],
      title: "",
      answer: "",
      userAnswer: ""
    };
  },
  created() {
    this.$http
      .get(
        `http://flss.kr/api/lesson/showQuestion?lno=${
          this.$store.getters.getLesson.Lno
        }&type=${this.$store.getters.getType}`
      )
      .then(res => {
        this.title = res.data[0].Title;
        this.answer = res.data[0].Ranswer;
      });
    this.$http
      .get(
        `http://flss.kr/api/lesson/showQuiz?lno=${
          this.$store.getters.getLesson.Lno
        }&type=${this.$store.getters.getType}`
      )
      .then(res => {
        this.quizs = res.data;
        console.log("quiz" + this.quizs);
      });
    this.$vuevent.$on("test", function(text) {
      console.log(text);
    });
  },
  methods: {
    checkAnswer() {
      console.log(this.quizs[0].Qid);
      console.log(this.userAnswer);
      console.log(this.$store.getters.getUserInfo.uid);
      this.$http
        .post("http://flss.kr/api/lesson/solveQuiz", {
          qid: this.quizs[0].Qid,
          answer: this.userAnswer,
          uid: this.$store.getters.getUserInfo.uid
        })
        .then(res => {
          if (res.data === 1) {
            alert("정답입니다!");
          } else if (res.data === 0) {
            alert("오답이네요...");
          } else {
            alert("이미 푼 문제입니다..");
            return;
          }
        });
    }
  }
};
</script>

<style>
</style>
