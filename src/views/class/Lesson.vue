<template>
  <div id="lesson">
    <b-container>
      <b-card 
            tag="article"
              class="mt-3 mb-2">
        <b-row>
          <b-col>
            <h3>{{ this.$store.getters.getLesson.LessonName }}</h3>
          </b-col>
          <b-col>
          </b-col>
          <b-modal id="qrcodeview" title="QR 코드" >
            <qrcode-vue :value="qrcodeResource" size="300"></qrcode-vue>
          </b-modal>
          <b-col>
            <b-button variant="danger" class="float-right" @click="remoteLesson">삭제</b-button>
            <font-awesome-icon v-b-modal.qrcodeview v-if="this.$store.getters.getLesson.File || this.$store.getters.getLesson.Link" title="QR코드 만들기" class="py-2 float-right mr-5" id="qrcode" fas icon="qrcode" size="4x"/><br>
          </b-col>
        </b-row>
            <p class="card-text">
              {{ this.$store.getters.getLesson.Explain }}
            </p>              
        <embed  v-if="this.$store.getters.getLesson.File"
               :src="'http://flss.kr/video/'+this.$store.getters.getLesson.File" controls allowfullscreen
                width="1000"
                height="565">
        <embed  v-else-if="this.$store.getters.getLesson.Link"
               :src="changeToEmbed" controls allowfullscreen
                width="1000"
                height="565">                
        <b-card class="mt-4" :header="title">
            <div v-for="(quiz, i) in quizs" :key="i">
              <div class="mt-3 mb-3">
                <input type="radio" name="answer" :value="i+1" v-model="userAnswer">
                <span>{{ i+1 + "." + quiz.Content}}</span>
              </div>
            </div>
            <b-button variant="primary" v-if="this.$store.getters.getUserInfo.role === 'student'" @click="checkAnswer()">제출</b-button> 
        </b-card>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  name: "lesson",
  data() {
    return {
      quizs: [],
      quizTitle: "",
      title: "",
      answer: "",
      userAnswer: ""
    };
  },
  async created() {
    await this.$http
      .get(
        `http://flss.kr/api/lesson/showQuestion?lno=${
          this.$store.getters.getLesson.Lno
        }`
      )
      .then(res => {
        this.title = res.data[0].Title;
        this.answer = res.data[0].Ranswer;
      });
    await this.$http
      .get(
        `http://flss.kr/api/lesson/showQuiz?lno=${
          this.$store.getters.getLesson.Lno
        }`
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
      console.log("qid" + this.quizs[0].Qid);
      console.log("answer" + this.userAnswer);
      console.log("uid" + this.$store.getters.getUserInfo.uid);
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
    },
    remoteLesson() {
      console.log(this.$store.getters.getLesson.Lno);
      this.$http
        .get("http://flss.kr/api/lesson/delete?lno=" + this.$store.getters.getLesson.Lno)
        .then(res => {
          console.log(res)
          if (res.data == '1') {
            this.$router.push({ path: "./classlist" });
          } else {
            alert("삭제에 실패하였습니다.")
          }
        })
    },
    qrcodeGenerate() {
      // if(this.$store.getters.getLesson.File) {
      //   'http://flss.kr/video/'+this.$store.getters.getLesson.File
      // } else if(this.$store.getters.getLesson.Link) {

      // }
    }
  },
  components: {
    QrcodeVue
  },
  computed: {
    changeToEmbed() {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = this.$store.getters.getLesson.Link.match(regExp);

      if (match && match[2].length == 11) {
        return `http://youtube.com/embed/${match[2]}`;
      } else {
        return 'error';
      }
    },
    changeToWatch() {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = this.$store.getters.getLesson.Link.match(regExp);

      if (match && match[2].length == 11) {
        return `http://youtube.com/watch/v=${match[2]}`;
      } else {
        return 'error';
      }
    },
    qrcodeResource() {
      if (this.$store.getters.getLesson.File) {
        return `http://flss.kr/video/${this.$store.getters.getLesson.File}` ;
      } else if(this.$store.getters.getLesson.Link) {
        return this.changeToWatch;
      }
    }
  }
};
</script>

<style lang="scss">
  #qrcode {
    cursor: pointer;
  }
</style>
