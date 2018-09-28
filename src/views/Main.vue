<template>
  <div id="main">
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
              <b-card title="공지사항"
                tag="article"
                class="mb-2">
              <p class="card-text">
                1학년 1반은 11페이지까지 풀어오도록 하세요.
              </p>
              <b-button href="#" variant="primary">Detail</b-button>
            </b-card>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-container fluid>
        <b-row class="mt-5">
          <b-col cols="3">
            <label for="inputLive">회원가입, 보상도구</label>
            <b-form-textarea
                      style="resize:none"
                      placeholder="Description"
                      rows="8" />
            <b-button class="mt-4" href="#" variant="primary">View details »</b-button>
          </b-col>
          <b-col cols="3">
            <label for="inputLive">수업 설계/영상제작</label>
            <b-form-textarea
                      style="resize:none"
                      placeholder="Description"
                      rows="8"/>
            <b-button class="mt-4" href="#" variant="primary">View details »</b-button>
          </b-col>
          <b-col cols="3">
            <label for="inputLive">상호작용</label>
            <b-form-textarea
                      style="resize:none"
                      placeholder="Description"
                      rows="8"/>
            <b-button class="mt-4" href="#" variant="primary">View details »</b-button>
          </b-col>
          <b-col cols="3">
            <label for="inputLive">회원가입, 보상도구</label>
            <b-form-textarea
                      style="resize:none"
                      placeholder="Description"
                      rows="8"/>
            <b-button class="mt-4" href="#" variant="primary">View details »</b-button>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";
import ClassRoomNavbar from "@/components/ClassRoomNavbar";
import ImageSlide from "@/components/ImageSlide";

export default {
  name: "main",
  data() {
    return {
      navs: [
        {
          link: "/createvideo",
          text: "영상 제작"
        },
        {
          link: "/makeclass",
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
          link: "/prize",
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
    ClassRoomNavbar,
    ImageSlide
  }
};
</script>

<style>
  .right{
    float:right;
  }
</style>
