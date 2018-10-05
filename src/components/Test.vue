<template>
  <div role="group">
    <!-- 영상 설명 부분 -->
    <b-container v-if="bool">
      <b-row>
      <label for="inputLive">영상 제목</label>
        <b-form-input id="inputLive"
                      type="text"
                      aria-describedby="inputLiveHelp inputLiveFeedback"
                      placeholder="제목을 입력해주세요."></b-form-input>
      </b-row>
      <b-row class="mt-5">
        <b-col cols="2">
          <label for="inputLive">관련 과목</label>
          <b-form-select class="mb-3" :options="subjectOption" />
        </b-col>
        <b-col cols="2">
          <label for="inputLive">관련 학년</label>
          <b-form-select class="mb-3" :options="gradeOption"/>
        </b-col>
        <b-col cols="2">
          <label for="inputLive">관련 학기</label>
          <b-form-select class="mb-3" :options="semesterOption"/>
        </b-col>
        <b-col cols="3">
          <label for="inputLive">관련 단원</label>
          <b-form-input></b-form-input>
        </b-col>
        
      </b-row>
      <b-row class="mt-4">
        <b-col cols="4" >
          <label for="inputLive">영상 설명</label>
          <b-form-textarea
                      v-model="text"
                      style="resize:none"
                      placeholder="Description"
                      rows="6" />
        </b-col>
        <b-col v-if="video">
          <b-card
                  tag="article"
                  style= "float:right;"
                  class="mb-2">
            <p class="m-5 text-center" >영상을 업로드해주세요.</p>
            <p class="mt-5">
              <b-row>
                <b-col cols="10">
                <b-form-file style="cursor:pointer"  placeholder="내 컴퓨터"></b-form-file>
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
        <b-col>
            <b-button style="float:right; margin-top:20%;" size="lg" variant="success" @click="next()">Next</b-button>
        </b-col>
      </b-row>
    </b-container>
    <!-- 퀴즈 출제 부분 -->
    <b-container class="mt-5" v-if="!bool">
      <b-row>
        <b-col cols="6" v-if="video">
          <label for="inputLive">영상 미리보기</label>
          <b-embed type="iframe"
           aspect="16by9"
           src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
           allowfullscreen
          ></b-embed>
        </b-col>
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
      <router-link to="/class1">
          <b-button style="float:right; margin-top:20%;" size="lg" variant="success">Upload!</b-button>
      </router-link>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      text: ""
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

      console.log(this.question);
      console.log(this.quizs);

      this.test = {
        title: this.questionTitle,
        quiz: this.question,
        answer: this.answer
      };

      this.questionTitle = "";
      this.question = [];
      this.answer = "";
      alert("문제 제출 성공!");
    },

    next() {
      this.bool = !this.bool;
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
      this.test = [];
    }
  },
  props: ["video"]
};
</script>
