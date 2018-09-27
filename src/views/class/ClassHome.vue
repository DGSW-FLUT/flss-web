<template>
  <div id="class-home">
      <b-container fluid>
        <b-row class="mt-5">
          <b-col cols="3">
            <div>
              <b-card title="플립드러닝이란?"
                tag="article"
                class="mb-2">
              <p class="card-text">
                전통적으로 교실 수업 시간에 수행했던 활동이 교실 밖에서 일어나며, 교실 밖에서 행해진 활동을 교실 수업 시간에 수행하는 수업 방법
              </p>
              <b-button href="#" variant="primary">More Info</b-button>
            </b-card>
            </div>
          </b-col>
          <b-col cols="6">
            <div>
              <b-card overlay
                      img-src="https://picsum.photos/900/250/?image=25"
                      img-alt="Card Image"
                      text-variant="white"
                      title="북삼초 1학년 1반"
                      sub-title="멤버 : 2명">
              </b-card>
            </div>
          </b-col>
          <b-col cols="3">
            <div>
              <b-jumbotron header="플립드러닝이란?">
                <span class="mt-5" style="font-size:20px;" >전통적으로 교실 수업 시간에 수행했던 활동이 교실 밖에서 일어나며, 교실 밖에서 행해진 활동을 교실 수업 시간에 수행하는 수업 방법</span>
                <b-btn class="m-3" style="float:right"  variant="primary" href="#">More Info</b-btn>
              </b-jumbotron>
            </div>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>

export default {
  name: "class-home",
  data() {
    return {
    };
  },
  components: {
  }
};
</script>

<style>
</style>
