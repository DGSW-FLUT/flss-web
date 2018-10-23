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
                {{ notice }}
              </p>
              <b-button v-b-modal.modal variant="primary">Detail</b-button>
              <b-modal id="modal" ref="modal" @shown="clearNotice" @ok="okNotice" title="공지사항 변경">
                <b-form-textarea v-model="newNotice"
                                style="resize:none"
                                placeholder="공지사항을 입력해주세요"
                                :rows="3"
                                :max-rows="6">
                </b-form-textarea>
              </b-modal>
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
    console.log(this.$store.getters.getThisClass.cid);
    this.$http
    .get(
      `http://flss.kr/api/notice/showNotice?cid=${this.$store.getters.getThisClass.cid}`
    )
    .then(res => {
      this.notice = res.data
    })
    this.className = this.$store.getters.getThisClass.name;
  },
  data() {
    return {
      className: "",
      member: "",
      newNotice: "",
      notice: ""
    };
  },
  methods: {
    okNotice() {
      this.$http.
      post("http://www.flss.kr/api/notice/addNotice", {
        cid: this.$store.getters.getThisClass.cid,
        notice: this.newNotice
      })
      .then(res => {
        alert("공지사항이 변경되었습니다");
        this.notice = this.newNotice;
        this.newNotice = "";
      })
      .catch(err => {
        alert("공지사항 변경에 실패하였습니다")
      })
    },
    clearNotice() {
      this.newNotice = "";
      this.newNotice = "";
    }
  },
  components: {}
};
</script>

<style>
</style>
