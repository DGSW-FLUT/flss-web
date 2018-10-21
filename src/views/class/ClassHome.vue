<template>
  <div id="class-home">
    <b-container fluid>
      <b-row class="mt-5">
        <b-col cols="3">
          <div>
            <b-card title="플립드러닝이란?" tag="article" class="mb-2">
              <p class="card-text">
                전통적으로 교실 수업 시간에 수행했던 활동이 교실 밖에서 일어나며, 교실 밖에서 행해진 활동을 교실 수업 시간에 수행하는 수업 방법
              </p>
              <b-button href="#" variant="primary">More Info</b-button>
            </b-card>
          </div>
        </b-col>
        <b-col cols="6">
          <div>
            <b-card overlay img-src="http://flss.kr/video/classBg.png" img-alt="Card Image" text-variant="white" :title="className">
              <p class="card-text">
                {{ `학생 ${member} 명` }}
              </p>
            </b-card>
          </div>
        </b-col>
        <b-col cols="3">
          <div>
            <b-card title="공지사항" tag="article" class="mb-2">
              <p class="card-text">
                수업 전 과제 안내 <br><br>
                - 사전영상/평가 목록 메뉴를 클릭해서
                오늘의 사전 영상을<br> 학습하고 이어지는 퀴즈를 풀어오세요!
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
          <b-form-textarea style="resize:none" placeholder="Description" rows="8" />
          <b-button class="mt-4" href="#" variant="primary">View details »</b-button>
        </b-col>
        <b-col cols="3">
          <label for="inputLive">수업 설계/영상제작</label>
          <b-form-textarea style="resize:none" placeholder="Description" rows="8" />
          <b-button class="mt-4" href="#" variant="primary">View details »</b-button>
        </b-col>
        <b-col cols="3">
          <label for="inputLive">상호작용</label>
          <b-form-textarea style="resize:none" placeholder="Description" rows="8" />
          <b-button class="mt-4" href="#" variant="primary">View details »</b-button>
        </b-col>
        <b-col cols="3">
          <label for="inputLive">회원가입, 보상도구</label>
          <b-form-textarea style="resize:none" placeholder="Description" rows="8" />
          <b-button class="mt-4" href="#" variant="primary">View details »</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "class-home",
  created() {
    this.$http
      .get(
        `http://flss.kr/api/class/member?cid=${
          this.$store.getters.getThisClass.id
        }&token=${this.$store.getters.getToken}`
      )
      .then(res => {
        this.$store.commit("setMemberList", res.data);
        this.member = this.$store.getters.getMemberList.length;
      });
    this.className = this.$store.getters.getThisClass.name;
  },
  data() {
    return {
      className: "",
      member: ""
    };
  },
  components: {}
};
</script>

<style>
</style>
