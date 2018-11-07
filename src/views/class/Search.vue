<template>
  <div id="search">
    <b-container>
      <b-modal ref="showLinkModalRef" hide-footer title="파일 다운로드 링크">
          <b-input-group prepend="링크">
            <b-form-input readonly id="fileLink" v-model="currentFileLink" />
            <b-input-group-append>
              <b-btn @click="copy(currentFileLink)"><font-awesome-icon far icon="copy" /></b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-modal>
      <b-tabs class="mt-3">
        <b-tab title="교사 자료실" active class="table">
          <b-row class="mt-2" v-for="(searchPost, i) in searchPosts" :key="i">
          <b-col>
              <b-card no-body>
                <b-row class="m-4">
                  <h4 slot="header" class="col-md-8">{{ searchPost.Title }}</h4>
                </b-row>
                <div class="ml-4 mb-3">
                  작성자 : {{ searchPost.Name }} 
                </div>
                <div class="border-bottom"> 
                  <div class="d-inline-block">
                    <font-awesome-icon class="py-2" fas icon="paperclip" size="2x" />
                    {{ searchPost.FileName }}
                  </div>
                <font-awesome-icon @click="showLink(`http://flss.kr/video/${searchPost.File}`)" class="post-name float-right py-2 mr-3" fas icon="link" size="3x" />
                <font-awesome-icon @click="download(searchPost.File,searchPost.Name)" class="post-name float-right py-2 mr-3" fas icon="download" size="3x" />
                </div>
                <b-card-body>
                  <p class="card-text">
                    <pre>{{ searchPost.Content }}</pre>
                  </p>
                </b-card-body>
                </b-card>
            </b-col>
          </b-row>
          <span class="aligncenter mt-5" v-if="!searchPosts.length"> 
            <font-awesome-icon class="py-2 ml-5 mr-5 " fas icon="exclamation-circle" size="10x"/><br>
            <span style="font-size:2em">등록된 교사 자료가 없습니다.</span>
          </span>
        </b-tab>
        <b-tab title="학습 게시판" class="table">
          <b-row class="mt-2" v-for="(searchLesson, i) in searchLessons" :key="i">
          <b-col>
              <b-card no-body>
                <b-row class="m-4">
                  <h4 slot="header" class="col-md-8">{{ searchLesson.Title }}</h4>
                </b-row>
                <div class="ml-4 mb-3">
                  작성자 : {{ searchLesson.Name }} 
                </div>
                <div class="border-bottom"> 
                  <div class="d-inline-block">
                    <font-awesome-icon class="py-2" fas icon="paperclip" size="2x" />
                    {{ searchLesson.FileName }}
                  </div>
                <font-awesome-icon @click="showLink(`http://flss.kr/video/${searchLesson.File}`)" class="post-name float-right py-2 mr-3" fas icon="link" size="3x" />
                <font-awesome-icon @click="download(searchLesson.File,searchLesson.Name)" class="post-name float-right py-2 mr-3" fas icon="download" size="3x" />
                </div>
                <b-card-body>
                  <p class="card-text">
                    <pre>{{ searchLesson.Content }}</pre>
                  </p>
                </b-card-body>
                </b-card>
            </b-col>
          </b-row>
          <span class="aligncenter mt-5" v-if="!searchLessons.length"> 
            <font-awesome-icon class="py-2 ml-5 mr-5 " fas icon="exclamation-circle" size="10x"/><br>
            <span style="font-size:2em">등록된 학생 게시물이 없습니다.</span>
          </span>
        </b-tab>
      </b-tabs>  
    </b-container>  
  </div>  
</template>

<script>
export default {
  data() {
    return {
      searchPosts: [],
      searchLessons: [],
      currentFileLink: ""
    }
  },  
  created() {
    this.$http
    .get(`http://flss.kr/api/data/getPostByName?cid=${this.$store.getters.getThisClass.cid}&name=${this.$route.params.query}`)
    .then(res1 => {
      this.searchPosts = res1.data;
      this.$http
      .get(`http://flss.kr/api/data/getPostByTitle?cid=${this.$store.getters.getThisClass.cid}&title=${this.$route.params.query}&readOnly=${this.$store.getters.getUserInfo.role}`)
      .then(async res2 => {
        let tempPosts = []; 
        tempPosts = await res2.data;
        this.searchPosts = this.searchPosts.concat(tempPosts);
      })
    })

    this.$http
    .get(`http://flss.kr/api/data/getPostByTitle?cid=${this.$store.getters.getThisClass.cid}&title=${this.$route.params.query}`)
    .then(res => {
      this.searchLessons = res.data;
    })
  },
  methods: {
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
    showLink(link) {
      this.$refs.showLinkModalRef.show();
      this.currentFileLink = link;
    },
    copy(link) {
      let t = document.getElementById("fileLink");
      t.select();
      document.execCommand('copy');
      alert("복사되었습니다.");
    }
  }
}
</script>

<style lang="scss">
  .post-name {
    cursor: pointer;
  }
</style>
