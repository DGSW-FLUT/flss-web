<template>
  <div id="design-class-list">
    <b-container>
      <b-row>
        <b-col cols="12">
          <span class="center" v-if="!classList.length"> 
              <font-awesome-icon class="py-2 ml-5 mr-5" fas icon="exclamation-circle" size="10x"/><br>
              <span style="font-size:2em">등록된 파일이 없습니다.</span>
          </span>
          <b-table hover :items="classList" @row-clicked="getFile"></b-table>    
          <b-modal ref="myModalRef" hide-footer :title="lessonTitle">
            <div v-if="fileList" v-for="(file, i) in fileList" :key="i">
              <b-card @click="download(file.File, file.Name)">
                {{ file.Name }}
              </b-card>
            </div>
              <b-input-group class="mt-3">
                <b-form-textarea
                      v-model="newComment"
                      style="resize:none;"
                      placeholder="댓글을 입력해주세요"
                      rows="1" />
                <b-button class="mr-3" variant="success" @click="uploadComment">작성</b-button>
                <font-awesome-icon v-if="!isComment" @click="loadComments" class="dropdown py-1 float-right" fas icon="caret-down" size="2x" />
                <font-awesome-icon v-else-if="isComment" @click="clickComment" class="dropdown py-1 float-right" fas icon="caret-up" size="2x" /> 
              </b-input-group>
              
              <div v-if="isComment">
                <comment v-for="(comment, index) in comments" :key="index" :comment="comment"></comment>
              </div>
          </b-modal>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Comment from "@/components/Comment";

export default {
  async created() {
    await this.$http
      .get(
        `http://flss.kr/api/design/designList?cid=${
          this.$store.getters.getThisClass.cid
        }`
      )
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          let singleClass = {
            "수업 리스트": res.data[i].Title
          };
          this.classList.push(singleClass);
        }
        this.List = res.data;
        console.log(`list: ${this.List}`);
      });
  },
  data() {
    return {
      isComment: false,
      lessonTitle: "",
      fileList: [],
      List: [],
      classList: [],
      newComment: "",
      selectedIdx: -1,
      comments: []
    };
  },
  methods: {
    getFile(record, index) {
      this.lessonTitle = this.List[index].Title;
      this.$http
        .get(`http://flss.kr/api/design/oneDesign?did=${this.List[index].Did}`)
        .then(res => {
          console.log("res.data" + res.data);
          this.fileList = res.data;
          this.selectedIdx = index;
          this.loadComments();
        });
      this.$refs.myModalRef.show();
      console.log("List" + this.List[index]);
      console.log("fileList" + this.fileList);
    },
    loadComments() {
      this.$http
      .get(`http://flss.kr//api/comment/showComment?type=3&post=${this.List[this.selectedIdx].Did}`)
      .then(res => {
        this.comments = res.data;
        this.isComment = !this.isComment;
      })
    },
    uploadComment() {
      if(!this.newComment) {
        alert("댓글을 입력해주세요");
        return;
      }
      this.$http
      .post("http://flss.kr/api/comment/addComment",{
        uid: this.$store.getters.getUserInfo.uid,
        type: 3,
        post: this.List[this.selectedIdx].Did,
        content: this.newComment
      })
      .then(res => {
        this.isComment = false;
        this.loadComments();
        this.newComment = "";
        alert("댓글이 작성되었습니다");
      })
      .catch(err => {
        console.log(err.message);
        this.newComment = "";
        alert("작성에 실패하였습니다");
      })
    },
    clickComment() {
      this.isComment = !this.isComment;
    },
    download(uploadName, originalName) {
      console.log("http://flss.kr/video/" + uploadName);
      this.$http
        .get("http://flss.kr/video/" + uploadName, { responseType: "blob" })
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", originalName);
          document.body.appendChild(link);
          link.click();
          console.log("Download Success");
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  },
  components: {
    Comment
  }
};
</script>

<style>
.aligncenter {
  transform: translateX(-50%);
  left: 50%;
  position: relative;
}
</style>
