<template>
    <div id="portfolio">
      <b-container v-if="!isPortfolio">
        <b-row>
          <b-col>
            <b-button class="mt-3" style="float:right; background-color:#d2a2fd; border:none" @click="portfolio()">포트폴리오</b-button>
          </b-col>
        </b-row>
        <b-row class="mt-2" v-for="(post, i) in getPosts" :key="i">
          <b-col>
              <b-card no-body>
                <b-row class="m-4">
                  <h4 slot="header" class="col-md-8">{{ post.Title }}</h4>
                </b-row>
                <div class="ml-4 mb-3">
                  작성자 : {{ post.Name }} 
                </div>
                <div class="border-bottom"> 
                  <div class="d-inline-block">
                    <font-awesome-icon class="py-2" fas icon="paperclip" size="2x" />
                    {{ post.FileName }}
                  </div>
                <font-awesome-icon @click="showLink(`http://flss.kr/video/${post.File}`)" class="post-name float-right py-2 mr-3" fas icon="link" size="3x" />
                <font-awesome-icon @click="download(post.File,post.Name)" class="post-name float-right py-2 mr-3" fas icon="download" size="3x" />
                </div>
                <b-card-body>
                  <p class="card-text">
                    <pre>{{ post.Content }}</pre>
                  </p>
                </b-card-body>
                <b-card-footer>
                <b-input-group>
                  <b-form-textarea
                        v-model="newComment[i]"
                        style="resize:none;"
                        placeholder="댓글을 입력해주세요"
                        rows="1" />
                  <b-button class="mr-3" variant="success" @click="uploadComment(i)">작성</b-button>
                  <font-awesome-icon v-if="!isComment" @click="loadComments(i)" class="dropdown py-1 float-right" fas icon="caret-down" size="2x" />
                  <font-awesome-icon v-else-if="isComment" @click="clickComment" class="dropdown py-1 float-right" fas icon="caret-up" size="2x" /> 
                </b-input-group>
                
                <div v-if="isComment">
                  <comment v-for="(comment, index) in comments[i]" :key="index" :comment="comment"></comment>
                </div>
              </b-card-footer>
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
        <b-container v-if="isPortfolio">
          <b-col>
           <b-button class="mt-3 mb-3" style="float:right; background-color:#d2a2fd; border:none" @click="portfolio()">학습게시판</b-button>
          </b-col>
          <b-tabs class="mt-5">
              <b-tab title="포트폴리오 만들기" active>
                 <h3 class="mt-5 mb-5">포트폴리오 만들기</h3>
                <b-input-group class="col-md-5 mb-5">
                    <b-form-input placeholder="찾을 학생 이름" v-model="studentName"></b-form-input>
                    <b-button slot="append" variant="success" @click="search">검색</b-button>
                </b-input-group>
                <div v-if="portfolios.length">
                  <b-row>
                    <b-col lg="7">
                      포트폴리오 제목 <b-form-input class="mt-3" placeholder="포트폴리오 제목을 입력해주세요" v-model="portfolioTitle"></b-form-input> <br>
                      교사의견 <b-form-textarea
                                v-model="teacherOpinion"
                                class="mb-3 mt-3"
                                style="resize:none"
                                placeholder="교사 의견을 입력해주세요"
                                rows="3" />
                      <b-button style="float:right; background-color:#d2a2fd; border:none"  @click="createPDF" :disabled="prograssPDF">포트폴리오 만들기</b-button>
                    </b-col>
                  </b-row>
                </div>
                <span class="aligncenter mt-5" v-if="!portfolios.length"> 
                    <font-awesome-icon class="py-2 ml-5 mr-5 " fas icon="exclamation-circle" size="10x"/><br>
                    <span style="font-size:2em">등록된 게시물이 없습니다.</span>
                  </span>
                <div id="portfolioitems" style="padding-bottom:10px">
                  <h3 class="mt-5 mb-5" v-if="portfolios.length">{{ portfolioTitle }}</h3>
                  <portfolio-item v-for="(portfolio,i) in portfolios" :key="i" :portfolio="portfolio" :i="i"></portfolio-item>
                  {{portfolios.length ? '교사의견' : ''}} <b-form-textarea
                                v-if="portfolios.length"
                                v-model="teacherOpinion"
                                class="mb-3 mt-3 opinion-readonly"
                                style="resize:none"
                                rows="3" readonly="readonly"/>
                </div>
              </b-tab>
              <b-tab title="포트폴리오 관리하기" >
                <b-table hover :items="portfolioList"  @row-clicked="portfolioClickEvent"></b-table>
              </b-tab>
            </b-tabs>
        </b-container>
        <b-modal ref="showLinkModalRef" hide-footer title="파일 다운로드 링크">
          <b-input-group prepend="링크">
            <b-form-input readonly id="fileLink" v-model="currentFileLink" />
            <b-input-group-append>
              <b-btn @click="copy(currentFileLink)"><font-awesome-icon far icon="copy" /></b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-modal>
    </div>
</template>

<script>
import PortfolioItem from "@/components/PortfolioItem";
import html2canvas from "html2canvas";
import Comment from "@/components/Comment";

// Use JSPDF
import jsPDF from "jspdf";
export default {
  name: "portfolio",
  data() {
    return {
      portfolios: [],
      selected: [],
      selectedStudentName: "",
      studentName: "",
      teacherOpinion: "",
      portfolioTitle: "",
      prograssPDF: false,
      portfolioList: [],
      portfolioData: [],
      content: "",
      file: "",
      title: "",
      posts: [],
      currentPage: "",
      isPortfolio: false,
      isComment: false,
      newComment: [],
      comments: [[]],
      currentFileLink:""
    };
  },
  computed: {
    isValidInput() {
      if (!this.portfolioTitle) return 1;
      if (!this.teacherOpinion) return 2;
      if (!this.selected.length) return 3;
      return 0;
      // return this.portfolioTitle && this.teacherOpinion && (this.selected.length !== 0);
    },
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
  methods: {
    search() {
      this.selected = [];
      this.selectedStudentName = this.studentName;
      this.$http
        .get(
          "http://flss.kr/api/data/getPostByName?cid=" +
            this.$store.getters.getThisClass.cid +
            "&name=" +
            this.studentName
        )
        .then(res => {
          this.portfolios = res.data;
          if (!this.portfolios.length) alert("해당 학생이 존재하지 않습니다.");
          this.portfolioTitle = this.studentName + "학생 포트폴리오";
        })
        .catch(err => {
          alert("해당 학생이 존재하지 않습니다.");
          this.portfolios = [];
          console.log(err.message);
        });
    },
    showLink(link) {
      this.$refs.showLinkModalRef.show();
      this.currentFileLink = link;
    },
    uploadComment(i) {
      console.log("test " + this.newComment[i]);
      if(!this.newComment[i]) {
        alert("댓글을 입력해주세요");
        return;
      }
      this.$http
      .post("http://flss.kr/api/comment/addComment",{
        uid: this.$store.getters.getUserInfo.uid,
        type: 0,
        post: this.posts[i].Pid,
        content: this.newComment[i]
      })
      .then(res => {
        this.comments[i].push(this.newComment[i]);
        this.newComment[i] = "";
        alert("댓글이 작성되었습니다");
      })
      .catch(err => {
        console.log(err.message);
        this.newComment[i] = "";
        alert("작성에 실패하였습니다");
      })
    },
    copy(link) {
      let t = document.getElementById("fileLink");
      t.select();
      document.execCommand('copy');
      alert("복사되었습니다.");
    },
    loadComments(i) {
      this.$http
      .get(`http://flss.kr//api/comment/showComment?type=0&post=${this.posts[i].Pid}`)
      .then(res => {
        this.comments[i] = res.data;
        this.isComment = !this.isComment;
      })
    },
    clickComment() {
      this.isComment = !this.isComment;
    },
    createPDF() {
      switch (this.isValidInput) {
        case 1:
          return alert("포트폴리오의 제목을 적지 않으셨습니다.");
        case 2:
          return alert("교사의견을 적지 않으셨습니다.");
        case 3:
          return alert("게시물을 선택하지 않으셨습니다.");
      }
      this.prograssPDF = true;
      // if(!this.isValidInput) {
      //   alert("입력하지 않은 부분이 있습니다. 확인해주세요");
      //   return;
      // }
      html2canvas(document.getElementById("portfolioitems")).then(canvas => {
        var imgData = canvas.toDataURL("image/png");
        console.log("create");
        var imgWidth = 190; // 이미지 가로 길이(mm) A4 기준 기본 210
        var pageHeight = 210 * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;
        var doc = new jsPDF("p", "mm");
        var position = 0;
        // 첫 페이지 출력
        doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        // 한 페이지 이상일 경우 루프 돌면서 출력
        while (heightLeft >= 20) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        // 파일 저장
        // doc.save(new Date().toJSON().split('T')[0] + '_' + this.studentName + '학생_포트폴리오' + '.pdf');
        this.prograssPDF = false;

        const newFile = new FormData();
        const pdfFile = new File([doc.output('blob')], this.portfolioTitle + '.pdf');
        newFile.append("portfolio", pdfFile);
        newFile.append("cid", this.$store.getters.getThisClass.cid);
        newFile.append("uid", this.portfolios[0].Uid);

        this.$http
        .post("http://flss.kr/api/portfolio/add", newFile, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.status == 200)
          {
              console.log("pdf upload success");
              this.getportfolioList();
          }
          else
            console.error(res)
        })
        .catch(err => {
          console.error(err)
          alert("pdf 파일 업로드에 실패하였습니다");
        })
        
      
        doc.save(this.portfolioTitle + '.pdf');
      })
    },
    getportfolioList() {
      this.$http
        .get(
          `http://flss.kr/api/portfolio/list?cid=${
            this.$store.getters.getThisClass.cid
          }`
        )
        .then(res => {
          this.portfolioList = [];
          if (res.data) {
            this.portfolioData = res.data;
          }

          res.data.forEach(portfolio => {
            let portfolioItem = {
              제목: portfolio.File.substring(13),
              이름: portfolio.Name,
              날짜: portfolio.AddTime
            };
            this.portfolioList.push(portfolioItem);
          });
        });
    },
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
      };

      if (this.posts[i].ReadOnly === "student") {
        console.log("already student");
        return;
      }

      this.$http
        .post("http://flss.kr/api/data/changeReadOnly", data)
        .then(res => {
          this.posts[i].ReadOnly = "student";
          console.log("Change ReadOnly Success");
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    uploadComment() {
      this.newComment = "";
      alert("댓글이 작성되었습니다");
    },
    changeReadOnlyToTeacher(i) {
      let data = {
        pid: this.posts[i].Pid,
        readOnly: "teacher"
      };

      if (this.posts[i].ReadOnly === "teacher") {
        console.log("already teacher");
        return;
      }

      this.$http
        .post("http://flss.kr/api/data/changeReadOnly", data)
        .then(res => {
          this.posts[i].ReadOnly = "teacher";
          console.log("Change ReadOnly Success");
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    portfolio() {
      this.isPortfolio = !this.isPortfolio;
    },
    portfolioClickEvent(record, index) {
      window.open(
        `http://flss.kr/portfoliofile/${this.portfolioData[index].File}`
      );
    }
  },
  mounted() {
    this.getportfolioList();
  },
  created() {
    this.$http
      .get(
        "http://flss.kr/api/data/getPostList?cid=" +
          this.$store.getters.getThisClass.cid +
          "&readOnly=student" 
      )
      .then(res => {
        this.posts = res.data;
        console.log(this.posts);
      })
      .catch(err => {
        console.log("error : " + err.message);
      });

    this.$http
      .get(
        `http://flss.kr/api/portfolio/list?cid=${
          this.$store.getters.getThisClass.cid
        }`
      )
      .then(res => {
        if (res.data) {
          this.portfolioData = res.data;
        }

        res.data.forEach(portfolio => {
          let portfolioItem = {
            제목: portfolio.File.substring(13),
            이름: portfolio.Name,
            날짜: portfolio.AddTime
          };
          this.portfolioList.push(portfolioItem);
        });
      });

    this.$vuevent.on("idx", idx => {
      if (this.portfolios[idx].selected) {
        this.selected.forEach((el, i) => {
          // console.log("el : "+el + " portfolio[idx] : ")
          if (el === this.portfolios[idx]) {
            this.selected.splice(i, 1);
          }
        });
      } else {
        this.selected.push(this.portfolios[idx]);
      }
      this.portfolios[idx].selected = !this.portfolios[idx].selected;
    });
  },
  components: {
    PortfolioItem,
    Comment
  }
};
</script>

<style lang="scss">
  .opinion-readonly {
    background-color: white !important;
  }
  .dropdown {
    cursor: pointer;
  }
  .post-name {
    cursor: pointer;
  }
</style>
