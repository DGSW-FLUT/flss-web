<template>
  <div id="library">
    <b-container>
      <b-row class="mt-5" v-for="(post, i) in getPosts" :key="i">
        <b-col>
            <b-card no-body>
              <b-row class="m-4">
                <h4 slot="header" class="col-md-8">{{ post.Title }}</h4>
                <div slot="header" class="col-md-4">
                  <b-dropdown v-if="isTeacherVuex" :text="posts[i].ReadOnly === 'student' ? '전체보기' : '선생님만'" class="float-right" variant="primary">
                    <b-dropdown-item @click="changeReadOnlyToStudent(i)">전체보기</b-dropdown-item>
                    <b-dropdown-item @click="changeReadOnlyToTeacher(i)">선생님만</b-dropdown-item>
                  </b-dropdown>
                </div>
              </b-row>
              <div class="border-bottom"> 
                <div class="post-name" @click="download(post.File,post.Name)">
                  <font-awesome-icon class="py-2" fas icon="paperclip" size="2x" />
                  {{ post.Name }}
                </div>
              </div>
              <b-card-body>
                <p class="card-text">
                  <pre>{{ post.Content }}</pre>
                </p>
              </b-card-body>
              <b-card-footer>{{ post.UploadTime }}</b-card-footer>
          </b-card>
          <!--<b-card style="cursor:pointer"
                  :header="file.text"
                  :footer="file.date"
                  footer-tag="footer"
                  >
              <p class="card-text">(file image)</p>
          </b-card>-->
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button style="float:right" v-b-modal.modal1>Add</b-button>
          <b-modal id="modal1" title="파일 추가하기" @ok="addFile()" @shown="clear()">
            <b-input-group prepend="제목">
              <b-form-input v-model="title" />
            </b-input-group>
            <b-input-group class="mt-4" prepend="본문">
              <b-form-textarea
                    style="resize:none"
                     v-model="content"
                     :rows="3" />
            </b-input-group>
            <b-form-file class="mt-4" v-model="file" ref="fileRef" placeholder="Choose a file..."></b-form-file>
          </b-modal>
        </b-col>
      </b-row>
      <b-pagination-nav v-if="posts.length !== 0" base-url="#" :number-of-pages="Math.ceil(posts.length/5)" v-model="currentPage"/>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "library",
  data() {
    return {
      content: "",
      file: "",
      title: "",
      posts: [],
      currentPage: ""
    };
  },
  computed: {
    getPosts() {
      let tempPosts = [];
      for (let i = (this.currentPage - 1) * 5; i < this.currentPage * 5; i++) {
        if (this.posts[i]) {
          tempPosts.push(this.posts[i]);
        }
      }
      return tempPosts;
    },
    isTeacherVuex() {
      return this.$store.getters.isTeacher;
    }
  },
  // 가짜 시간 함수: 나중에 삭제
  created() {
    this.$http
      .get(
        "http://flss.kr/api/data/getPostList?cid=" +
          this.$store.getters.getThisClass.cid +
          "&readOnly=" +
          this.$store.getters.getUserInfo.role
      )
      .then(res => {
        this.posts = res.data;
      })
      .catch(err => {
        console.log("error : " + err.message);
      });
    // this.files.forEach(file => {
    //   let past = this.$moment("20180928 2:31:12", "YYYYMMDD H:mm:ss").format(
    //     "YYYY-MM-DD H:mm:ss"
    //   );
    //   file.date = past;
    // });
  },
  methods: {
    clear() {
      this.text = "";
      this.$refs.fileRef.reset();
    },
    addFile() {
      let newFile = new FormData();
      newFile.append("cid", this.$store.getters.getThisClass.cid);
      newFile.append("title", this.title);
      newFile.append("uid", this.$store.getters.getUserInfo.uid);
      newFile.append("content", this.content);
      newFile.append("readOnly", this.$store.getters.getUserInfo.role);
      newFile.append("name", this.file.name);
      newFile.append("video", this.file);

      this.$http
        .post("http://flss.kr/api/data/addPost", newFile, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          console.log("Success");
          location.reload();
          return;
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    download(uploadName, originalName) {
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
    },
    changeReadOnlyToStudent(i) {
      let data = {
        pid: this.posts[i].Pid,
        readOnly: "student"
      }

      if (this.posts[i].ReadOnly === 'student'){
        console.log("already student");
        return;
      }

      this.$http
      .post('http://flss.kr/api/data/changeReadOnly',data)
      .then(res => {
        this.posts[i].ReadOnly = "student";
        console.log("Change ReadOnly Success");
      })
      .catch(err => {
        console.log(err.message);
      });
    },
    changeReadOnlyToTeacher(i) {
      let data = {
        pid: this.posts[i].Pid,
        readOnly: "teacher"
      }
      
      if (this.posts[i].ReadOnly === 'teacher'){
        console.log("already teacher");
        return;
      }

      this.$http
      .post('http://flss.kr/api/data/changeReadOnly',data)
      .then(res => {
        this.posts[i].ReadOnly = "teacher";
        console.log("Change ReadOnly Success");
      })
      .catch(err => {
        console.log(err.message);
      });
    }
  }
};
</script>

<style lang="scss">
.post-name {
  cursor: pointer;
  display: inline-block;
}
</style>
