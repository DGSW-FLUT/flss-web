<template>
  <div id="main">
      <main-navbar />
      <class-room-navbar :navs="navs"/>
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
            <!--
              <b-card border-variant="primary"
                header="플립드러닝이란?"
                header-bg-variant="primary"
                header-text-variant="white"
                align="center">
                 <span class="mt-5" style="font-size:20px;" >전통적으로 교실 수업 시간에 수행했던 활동이 교실 밖에서 일어나며, 교실 밖에서 행해진 활동을 교실 수업 시간에 수행하는 수업 방법</span>
                <b-btn  style="float:right"  variant="primary" href="#">More Info</b-btn>
              </b-card>
              -->
              <!--<b-jumbotron header="플립드러닝이란?" >
                <span class="mt-5" style="font-size:20px;" >전통적으로 교실 수업 시간에 수행했던 활동이 교실 밖에서 일어나며, 교실 밖에서 행해진 활동을 교실 수업 시간에 수행하는 수업 방법</span>
                <b-btn  style="float:right"  variant="primary" href="#">More Info</b-btn>
              </b-jumbotron> -->
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
            <div class >
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
import MainNavbar from "@/components/MainNavbar";
import ClassRoomNavbar from "@/components/ClassRoomNavbar";

export default {
  name: "main",
  data() {
    return {
      navs: [
        {
          link: "/",
          text: "가입한 학급"
        },
        {
          link: "/",
          text: "수업 설계"
        },
        {
          link: "/",
          text: "수업 자료"
        },
        {
          link: "/",
          text: "상호 작용"
        },
        {
          link: "/",
          text: "보상 도구"
        },
        {
          link: "/",
          text: "지원 도구"
        },
        {
          link: "/",
          text: "평가 도구"
        },
        {
          link: "/",
          text: "학습 자료"
        }
      ]
    };
  },
  components: {
    MainNavbar,
    ClassRoomNavbar
  }
};
</script>

<style>
</style>
