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
                      style="resize:none"
                      placeholder="Description"
                      rows="6" />
        </b-col>
        <b-col >
          <b-card
                  tag="article"
                  style= "float:right;"
                  class="mb-2">
            <p class="m-5">영상을 업로드해주세요.</p>
            <p class="mt-5">
              <b-button style="float:left; min-width:100px;" href="#" variant="primary">내 컴퓨터</b-button>
              <b-button style="float:right; min-width:100px;" href="#" variant="primary"> URL</b-button>
            </p>
          </b-card>
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
      quizbool: false,
      bool: true
    };
  },
  methods: {
    next() {
      this.bool = !this.bool;
    }
  }
};
</script>
