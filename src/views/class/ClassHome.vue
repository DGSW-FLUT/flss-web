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
              <b-button href="#" variant="primary">자세히 보기</b-button>
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
              <b-button v-b-modal.modal variant="primary">변경하기</b-button>
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
        <b-col  v-for="(content, i) in contents" :key="i" cols="4">
          <b-card :title="content.name" tag="article" class="mb-2">
              <p v-if="!content.content" class="card-text">
                등록된 내용이 없습니다.
              </p>
              <p v-if="content.content" class="card-text">
                {{ content.content }}
              </p>
              <b-button @click="content.bool = !content.bool" variant="primary">변경하기</b-button>
              <b-button style="float:right;" :href="'http://flss.kr/class/'+content.url" variant="primary">자세히 보기 »</b-button>  
              <b-modal v-model="content.bool" ref="modal" @shown="clearNotice"  @ok="changeContent(i)" :title="content.name">
                <b-form-textarea v-model="content.newContent"
                                style="resize:none"
                                placeholder="내용을 입력해주세요."
                                :rows="3"
                                :max-rows="6">
                </b-form-textarea>
              </b-modal>
            </b-card>
        </b-col>
        <!-- <b-col cols="4">
          <b-card title="수업 설계/영상제작" tag="article" class="mb-2">
              <p class="card-text">
                
              </p>
              <b-button v-b-modal.classModal variant="primary">변경하기</b-button>
              <b-button style="float:right;" href="#" variant="primary">자세히 보기 »</b-button>  
              <b-modal id="classModal" ref="modal"  @ok="okNotice" title="수업 설계/영상제작">
                <b-form-textarea v-model="newNotice"
                                style="resize:none"
                                placeholder="내용을 입력해주세요."
                                :rows="3"
                                :max-rows="6">
                </b-form-textarea>
              </b-modal>
            </b-card>
        </b-col>
        <b-col cols="4">
          <b-card title="상호작용" tag="article" class="mb-2">
              
              <p class="card-text">
                
              </p>
              <b-button v-b-modal.togetherModal variant="primary">변경하기</b-button>
              <b-button style="float:right;" href="#" variant="primary">자세히 보기 »</b-button>  
              <b-modal id="togetherModal" ref="modal"  @ok="okNotice" title="상호작용">
                <b-form-textarea v-model="newNotice"
                                style="resize:none"
                                placeholder="내용을 입력해주세요."
                                :rows="3"
                                :max-rows="6">
                </b-form-textarea>
              </b-modal>
            </b-card>
            
        </b-col> -->
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
    this.$http
      .get(
        `http://flss.kr/api/notice/showContents?cid=${
          this.$store.getters.getThisClass.cid
        }`
      )
      .then(res => {
        this.notice = res.data[0].Contents;
        this.contents[0].content = res.data[0].Contents1;
        this.contents[0].url = 'prize';
        this.contents[1].content = res.data[0].Contents2;
        this.contents[1].url = 'makeclass';
        this.contents[2].content = res.data[0].Contents3;
        this.contents[2].url = 'interaction';
        console.log(this.contents);
      });
    this.className = this.$store.getters.getThisClass.name;
  },
  data() {
    return {
      test: "reg",
      className: "",
      member: "",
      newNotice: "",
      notice: "",
      contents: [
        {
          name: this.$store.getters.isTeacher ? "회원가입, 보상도구" : "회원가입",
          content: "",
          id: "reg",
          newContent: "",
          bool: false
        },
        {
          name: this.$store.getters.isTeacher ? "수업 설계/영상제작" : "디딤학습방",
          content: "",
          id: "class",
          newContent: "",
          bool: false
        },
        {
          name: this.$store.getters.isTeacher ? "상호작용" : "생각나누기",
          content: "",
          id: "together",
          newContent: "",
          bool: false
        }
      ],
      showContents: []
    };
  },
  methods: {
    okNotice() {
      this.$http
        .post("http://flss.kr/api/notice/addContents", {
          cid: this.$store.getters.getThisClass.cid,
          column: 'Contents',
          contents: this.newNotice
        })
        .then(res => {
          alert("공지사항이 변경되었습니다");
          this.notice = this.newNotice;
          this.newNotice = "";
        })
        .catch(err => {
          alert("공지사항 변경에 실패하였습니다");
        });
    },
    checkIdx(i) {
      return i+1;
    },
    changeContent(i) {
      this.$http
        .post("http://flss.kr/api/notice/addContents", {
          cid: this.$store.getters.getThisClass.cid,
          column: "Contents" + this.checkIdx(i),
          contents: this.contents[i].newContent
        })
        .then(res => {
          if (res.data == 1) {
            alert("변경 완료!");
            this.contents[i].content = this.contents[i].newContent;
            this.clearNotice();
          } else {
            alert("변경되지 않았습니다.");
          }
        });
    },
    clearNotice() {
      this.contents.forEach(content => {
        content.newContent = "";
      });
      this.newNotice = "";
    }
  },

  components: {}
};
</script>

<style>
</style>
