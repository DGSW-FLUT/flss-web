<template>
  <div role="group">
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
          <b-form-select class="mb-3" />
        </b-col>
        <b-col cols="2">
          <label for="inputLive">관련 학년</label>
          <b-form-select class="mb-3" />
        </b-col>
        <b-col cols="2">
          <label for="inputLive">관련 학기</label>
          <b-form-select class="mb-3" />
        </b-col>
        <b-col cols="3">
          <label for="inputLive">관련 단원</label>
          <b-form-select class="mb-3" />
        </b-col>
        <b-col cols="3">
          <label for="inputLive">관련 차시</label>
          <b-form-select class="mb-3" />
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="4">
          <label for="inputLive">영상 설명</label>
          <b-form-textarea
                      v-model="text"
                      style="resize:none"
                      placeholder="Description"
                      rows="6" />
        </b-col>
        <b-col >
          <b-card
                  tag="article"
                  style= "float:right;"
                  class="mb-2">
            <p class="m-5 text-center">영상을 업로드해주세요.</p>
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
    <b-container class="mt-5" v-if="!bool">
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
        <b-col cols="5" v-if="isQuizShowed">
          <b-form-input
            class="mb-3"
            type="text"
            placeholder="문제를 내주세요." />
            <b-input-group  v-for="(quiz, i) in this.quizs" :key="i">
              <b-input-group-prepend is-text>
                  <input type="radio" name="quiz" :value="i+1">
              </b-input-group-prepend>
              <b-form-input type="text" :placeholder="quiz" />
            </b-input-group>
            <b-button style="float:right;" variant="danger" v-if="canAdd" @click="del()">DEL</b-button>
            <b-button style="float:right;" variant="success" v-if="canDelete" @click="add()">ADD</b-button>
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
      quizs: ["1번 문항", "2번 문항"],
      isQuizShowed: false,
      bool: true,
      text: "",
      addbool: this.quizCnt > 5,
      delbool: this.quizCnt < 2
    };
  },
  computed: {
    quizCnt() {
      return this.quizs.length;
    },
    canAdd() {
      return this.quizCnt > 2;
      // if (this.quizCnt >= 5 || this.quizCnt < 2) {
      //   return false;
      // }
      // return true;
    },
    canDelete() {
      return this.quizCnt < 5;
    }
  },
  methods: {
    next() {
      this.bool = !this.bool;
    },
    showquiz() {
      this.isQuizShowed = !this.isQuizShowed;
    },
    add() {
      this.quizs.push(this.quizCnt + 1 + "번 문항");
    },
    del() {
      this.quizs.splice([this.quizCnt - 1], 1);
    }
  }
};
</script>
