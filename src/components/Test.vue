<template>
  <div role="group">
    <!-- 영상 설명 부분 -->
    <b-container v-if="bool">
      <b-row>
      <label for="inputLive">영상 제목</label>
        <b-form-input id="inputLive"
                      type="text"
                      v-model="title"
                      aria-describedby="inputLiveHelp inputLiveFeedback"
                      placeholder="제목을 입력해주세요."></b-form-input>
      </b-row>
      <b-row class="mt-5">
        <b-col cols="2">
          <label for="inputLive">관련 과목</label>
          <b-form-select class="mb-3" v-model="subject" :options="subjectOption" />
        </b-col>
        <b-col cols="2">
          <label for="inputLive">관련 학년</label>
          <b-form-select class="mb-3" v-model="grade" :options="gradeOption"/>
        </b-col>
        <b-col cols="2">
          <label for="inputLive">관련 학기</label>
          <b-form-select class="mb-3" v-model="semester" :options="semesterOption"/>
        </b-col>
        <b-col cols="3">
          <label for="inputLive">관련 단원</label>
          <b-form-input v-model="chapter"></b-form-input>
        </b-col>
        
      </b-row>
      <b-row class="mt-4">
        <b-col cols="4" >
          <label for="inputLive">영상 설명</label>
          <b-form-textarea
                      v-model="description"
                      style="resize:none"
                      placeholder="Description"
                      rows="6" />
        </b-col>
        <b-col v-if="video">
          <b-card
                  tag="article"
                  class="mb-2">
            <p class="m-5 text-center" >영상을 업로드해주세요.</p>
            <p class="mt-5">
              <b-row>
              <b-col cols="7">
                <input type="file" v-on:change="onFileChange" name="file[]" class="file_multi_video" accept="video/*" >
              </b-col>
              <b-col cols="3">
                <b-btn v-if="isVideoUploded" v-b-modal.videopreview>영상 미리보기</b-btn>
                <b-modal id="videopreview" title="영상 미리보기">
                  <video width="400" controls >
                    <source src="mov_bbb.mp4" id="video_here">
                  </video>
                </b-modal>
              </b-col>
              <b-col cols="2">
                <b-button v-b-modal.URL variant="primary"> URL</b-button>
              </b-col>
              </b-row>
            </p>
          </b-card>
          <b-modal id="URL"
                    ref="modal"
                    title="URL로 업로드"
                    >
              <form @submit.stop.prevent="handleSubmit">
                <b-form-input type="text"
                              placeholder="URL 입력"
                              ></b-form-input>
              </form>
            </b-modal>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="1">공유하기</b-col>
        <b-col cols="2">
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
            <b-button style="float:right; margin-top:20%;" size="lg" variant="success" @click="next()">Next</b-button>
        </b-col>
      </b-row>
    </b-container>
    <!-- 퀴즈 출제 부분 -->
    <b-container class="mt-5" v-if="!bool">
      <b-row>
        
        
        <b-col class="mt-5" cols="5" v-if="!isQuiz">
          <b-form-input
            class="mb-3"
            type="text"
            v-model="questionTitle"
            placeholder="문제를 내주세요." />
            <b-input-group  v-for="(quiz, i) in this.quizs" :key="i">
              <b-input-group-prepend is-text>
                  <input type="radio" name="quiz" :value="i+1" v-model="answer">
              </b-input-group-prepend>
              <b-form-input type="text" :placeholder="quiz.idx" v-model="question[i]"/>
            </b-input-group>
            <b-button style="float:right;" variant="primary" @click="addQuiz()">출제하기</b-button>
            <b-button style="float:right;" variant="danger" v-if="canAdd" @click="del()">문항 삭제</b-button>
            <b-button style="float:right;" variant="success" v-if="canDelete" @click="add()">문항 추가</b-button>
        </b-col>
        <b-col class="mt-5" v-if="isQuiz">
          <b-card 
                  tag="article"
                  style="min-width: 20rem; float:right"
                  class="mb-2">
            <p class="card-text">
              {{ this.test.title }}
              <b-button style="float:right" variant="danger" @click="removeQuiz()">X</b-button>
            </p>
            <p v-for="(test, i) in this.test.quiz" :key="i">
              {{ i+1 + ". " + test }}
            </p>
            <p>정답 : {{ this.test.answer }}</p>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-4">
          
        </b-col>
      </b-row>
      <router-link to="/class1">
          <b-button style="float:right; margin-top:20%;" size="lg" variant="success">Upload!</b-button>
      </router-link>
    </b-container>
  </div>
</template>

<script>
var $source;
var efg = false;
var link;

$(document).on("change", ".file_multi_video", function(evt) {
  $source = $("#video_here");
  link = URL.createObjectURL(this.files[0]);
  $source[0].src = URL.createObjectURL(this.files[0]);
  $source.parent()[0].load();
  efg = true;
});

export default {
  data() {
    return {
      abc: $source,
      subjectOption: ["국어", "수학", "사회", "과학", "영어"],
      gradeOption: ["1학년", "2학년", "3학년", "4학년", "5학년", "6학년"],
      semesterOption: ["1학기", "2학기"],
      question: [],
      answer: "",
      test: [],
      questionTitle: "",
      quizs: [
        {
          idx: "1번 문항"
        },
        {
          idx: "2번 문항"
        }
      ],
      bool: true,
      title: "",
      subject: "",
      grade: "",
      semester: "",
      chapter: "",
      description: "",
      text: "",
      file: "",
      isVideoUploded: false
    };
  },
  computed: {
    quizCnt() {
      return this.quizs.length;
    },
    canAdd() {
      return this.quizCnt > 2;
    },
    canDelete() {
      return this.quizCnt < 5;
    },
    isQuiz() {
      return this.test.length !== 0;
    },
    isQuizFilled() {
      for (let i = 0; i < this.test.quiz; i++) {
        if (this.test.quiz[i].trim() == "") {
          return false;
        }
      }
    }
  },
  methods: {
    addQuiz() {
      console.log(this.isQuizFilled);
      if (this.questionTitle.trim() == "" || this.isQuizFilled) {
        alert("문제를 입력해주세요!");
        return;
      }
      this.test = {
        title: this.questionTitle,
        quiz: this.question,
        answer: this.answer
      };

      let quizForm = {
        lno: this.$store.getters.getLessonNum,
        item: this.question,
        ranswer: this.answer,
        question: this.questionTitle
      };

      console.log("quizForm" + quizForm);

      this.$http
        .post("http://flss.kr/api/lesson/addQuiz", {
          lno: quizForm.lno,
          item: quizForm.item,
          ranswer: quizForm.ranswer,
          question: quizForm.question
        })
        .then(res => {
          console.log("status" + res.data.status);
        });

      this.questionTitle = "";
      this.question = [];
      this.answer = "";
      alert("문제 제출 성공!");
    },

    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      console.log(files);
      if (files.length) {
        this.file = files[0];
        this.isVideoUploded = true;
      }
    },

    next() {
      let data = new FormData();
      if (this.file) {
        data.append("video", this.file);
        console.log("hi!");
      }
      data.append("uid", this.$store.getters.getUserInfo.uid);
      data.append("cid", this.$store.getters.getThisClass.cid);
      data.append("title", this.title);
      data.append("subject", this.subject);
      data.append("grade", this.grade);
      data.append("semester", this.semester);
      data.append("unit", this.chapter);
      data.append("chapter", this.chapter);
      data.append("explain", this.description);
      console.log(data);
      this.$http
        .post("http://flss.kr/api/lesson/add", data, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          console.log(res.data);
          console.log("res num : " + res.data.Lno);
          console.log("test : " + data);
          this.$store.commit("setLessonNum", res.data.Lno);
          if (res.status == 200) {
            this.bool = !this.bool;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    add() {
      let newQuestion = {
        idx: this.quizCnt + 1 + "번 문항"
      };
      this.quizs.push(newQuestion);
    },
    del() {
      this.quizs.splice([this.quizCnt - 1], 1);
    },

    removeQuiz() {
      var quizDel = confirm("퀴즈를 다시 내시겠습니까?");
      if (quizDel === true) {
        this.test = [];
      }
    }
  },
  props: ["video"]
};
</script>
<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>

