<template>
  <div role="group">
    <b-container>
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
          <router-link to="/showvideo">
            <b-button style="float:right; margin-top:20%;" size="lg" variant="success">Next</b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
