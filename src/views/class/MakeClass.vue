<template>
  <div id="make-class">
    <b-card style="float:right">
        수업 설계 메뉴 안내 <br><br>
        교실 수업 순서에 맞게 수업<br>
        자료를 추가할 수 있습니다.<br><br>
        수업자료는 내컴퓨터의 자료,<br>
        웹 주소, FLSS 내 자료를<br>
        검색하여 추가할 수 있습니다.<br><br>
        다른 사용자가 작성한 자료를<br>
        검색하여 활용할 수 있습니다.
      </b-card>
      <b-container class="mt-5">
      <b-row>
        <b-col cols="6" >
          <div class="div1 border no-scrollbar" style="max-width:100%">
            <label for="inputLive" class="mt-3">수업 제목</label>
            <b-button v-if="!did" variant="success" size="sm" class="float-right mt-3" @click="makeClass()">만들기</b-button>
            <b-button v-if="did" variant="primary" size="sm" class="float-right mt-3" @click="completeMakeClass()">업로드하기</b-button>
            <b-button  variant="warning" size="sm" class="float-right mt-3 mr-3" v-b-modal.info>사용법</b-button>
            <b-modal id="info" title="사용법">
              <p>
                  <span style="font-size:2em">수업 설계 메뉴 안내</span> <br>
                  교실 수업 순서에 맞게 수업 자료를 추가할 수 있습니다. <br>
                  수업자료는 FLSS 내 자료를 검색하여 추가할 수 있습니다. <br>
                  다른 사용자가 작성한 자료를 검색하여 활용할 수 있습니다
              </p>
              <p>
                  <span style="font-size:2em">사용법</span> <br>
                  1. 수업 제목을 입력한 후 Make 버튼을 누릅니다. <br>
                  2. 오른쪽 파일들을 클릭해 파일들을 추가합니다. <br>
                  3. Upload 버튼을 통해 수업설계를 마칩니다. <br>
                  4. 설계한 파일은 수업설계 목록에서 확인할 수 있습니다.
              </p>
            </b-modal>
            <b-form-input
                  v-model="title"
                  class="mt-3"
                  type="text"
                  placeholder="Text input"></b-form-input>
            <b-list-group>
              <b-list-group-item class="flex-column align-items-start mt-3" v-for="(file, i) in files" :key="i">
                <p class="mb-1" style="text-overflow: ellipsis; overflow: hidden">
                  {{ file.fileName }}
                </p>
                <!-- TODO: 실제 구현 필요 -->
                <small>{{ file.fileExt }}</small>&nbsp;<b-badge :variant="getFileUsageColor(i)" >{{ getFileUsage(i) }}</b-badge>
                <small style="float:right">{{ file.date }}</small>
              </b-list-group-item>
            </b-list-group>
            <b-row>
              <b-col class="mt-4" cols="2">
                <label class="switch">
                  <input type="checkbox">
                  <span class="slider round"></span>
                </label>
              </b-col>
              <b-col class="ml-4 mt-4">공유하기</b-col>
            </b-row>
          </div>
        </b-col>
        <b-modal ref="progress" hide-footer hide-header no-close-on-backdrop>
          <b-progress :value="uploadPercentage" show-progress animated variant="success"></b-progress>
        </b-modal>
        <b-modal id="link" ref="link" @ok="okLink" title="Enter Link">
             <b-form-group label-for="newInteractionLink" :state="linkState" :invalid-feedback="invalidLink">
              <b-form-input id="newInteractionLink" v-model.trim="newLink" type="text" placeholder="E.g. https://youtube.com" :state="linkState" />
            </b-form-group>
          </b-modal>
        <b-col v-if="did" cols="6">
          <b-nav>
              <b-nav-item active @click="pcResource()">PC 자료</b-nav-item>
              <b-nav-item active @click="search()">FLSS 검색</b-nav-item>
              <b-nav-item active @click="link()">링크</b-nav-item>
          </b-nav>
          <div  class="div1 border no-scrollbar" style="min-width:100%">
            <b-row class="mt-5 ml-5">
              <b-col v-if="isPcResource" cols="7" class="float-right">
                <input type="file" v-on:change="onFileChange" name="file[]" class="file_multi_video">
              </b-col>
              <b-col>
                <b-button v-if="uploadFile" variant="success" class="ml-5" @click="fileUpload">업로드</b-button>
              </b-col>
            </b-row>
            <b-button v-if="isLink" variant="success" class="ml-5 mt-5" @click="linkSelect">링크 업로드</b-button>
            <span class="center" v-if="(!items.length) && isFlss"> 
              <font-awesome-icon class="py-2 ml-5 mr-5" fas icon="exclamation-circle" size="4x"/><br>
              등록된 파일이 없습니다
            </span>
            <b-table style="cursor:pointer" v-if="isFlss" hover :items="items" @row-clicked="addFile"></b-table>      
            </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";
import FileList from "@/components/FileList";
// const items = [
//   { fileName: "1.pptx", date: "2018-08-01" },
//   { fileName: "2.hwp", date: "2018-08-02" },
//   { fileName: "3.pptx", date: "2018-08-03" },
//   { fileName: "4.pptx", date: "2018-08-04" }
// ];
export default {
  name: "make-class",
  data() {
    return {
      lessonTitle: "",
      isPcResource: false,
      title: "",
      fileItems: [],
      items: [],
      files: [],
      classList: [],
      List: [],
      did: "",
      flssItems: [],
      fileList: [],
      pcResources: [],
      uploadFile: "",
      uploadPercentage: 0,
      newLink: "",
      isLink: false,
      isFlss: false
      //["PC 자료", "웹 주소", "FLSS 검색", "내 즐겨찾기"]
    };
  },
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
      });
    await this.$http
      .get(
        `http://flss.kr/api/data/getDataList?cid=${
          this.$store.getters.getThisClass.cid
        }&role=${this.$store.getters.getUserInfo.role}`
      )
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          let items = {
            fileName: res.data[i].Name
          };
          this.flssItems.push(items);
        }
        this.fileItems = res.data;
      });

    await console.log("fileItems" + this.fileItems[1].Mid);
    await console.log(this.classList);
    await console.log(this.items);
  },
  components: {
    MainNavbar,
    FileList
  },
  computed: {
    linkState() {
      const urlreg = /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
      return urlreg.test(this.newLink);
    },
    invalidLink() {
      if (!this.linkState) {
        return "Please enter a valid link";
      }
      return "";
    }
  },
  methods: {
    makeClass() {
      if (this.title.trim() === "") {
        alert("입력해주세요.");
        return;
      }
      this.$http
        .post("http://flss.kr/api/design/addDesign", {
          title: this.title,
          cid: this.$store.getters.getThisClass.cid
        })
        .then(res => {
          this.did = res.data.Did;
          console.log(this.did);
        });
    },
    fileUpload() {
      const data = new FormData();
      data.append("did",this.did)
      data.append("name",this.uploadFile.name);
      data.append("cid",this.$store.getters.getThisClass.cid)
      data.append("file",this.uploadFile);
      this.$refs.progress.show();
      this.$http
        .post("http://flss.kr/api/design/addFile", data, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: function(progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }.bind(this)
        })
        .then((res) => {
          console.log(res.data);
          let fileExt = this.uploadFile.name.split('.');
          fileExt = `.${fileExt[fileExt.length-1]}`;
          this.files.push({
            fileName: this.uploadFile.name,
            fileExt
          })
          console.log(this.files);
          this.uploadFile = "";
          this.$refs.progress.hide();
        })
    },
    addFile(record, index) {
      console.log("MID" + this.fileItems[index].Mid);
      console.log("CID" + this.$store.getters.getThisClass.cid);
      console.log("did" + this.did);
      this.$http
        .post("http://flss.kr/api/design/addFile", {
          did: this.did,
          Mid: this.fileItems[index].Mid,
          cid: this.$store.getters.getThisClass.cid
        })
        .then(res => {
          this.items[index];
          console.log("데이터" + res.data);
        });
      console.log(this.fileItems[index]);
      let name = this.items[index].fileName;
      let fileExt = name.substring(name.lastIndexOf("."), name.length);
      if(!this.isLink) {
        this.items[index].fileExt = fileExt;
      }
      this.files.push(this.items[index]);
    },
    okLink(evt) {
      evt.preventDefault();
      if (!this.linkState) {
        alert("올바르지 않은 입력 형식 입니다.");
        return;
      } else {
        console.log(this.$store.getters.getThisClass.cid);
        this.$http
        .post("http://flss.kr/api/design/addFile", {
          did: this.did,
          name : this.newLink,
          link: this.newLink,
          cid: this.$store.getters.getThisClass.cid
        })
        .then(res => {
          console.log(this.link);
          console.log(this.newLink);
          console.log(res.data);
          this.files.push({
            fileName: this.newLink
          });
          this.newLink = "";
          this.$refs.link.hide();
        });
      }
    },
    getFile(record, index) {
      this.lessonTitle = this.List[index].Title;
      this.$http
        .get(`http://flss.kr/api/design/oneDesign?did=${this.List[index].Did}`)
        .then(res => {
          console.log("res.data" + res.data);
          this.fileList = res.data;
        });
      this.$refs.myModalRef.show();
      console.log("List" + this.List[index]);
      console.log("fileList" + this.fileList);
    },
    loadFile(file) {
      var url = `http://flss.kr/video/${file}`;
      window.open(url);
    },
    completeMakeClass() {
      if (this.files.length) alert("수업 설계 완료");
      else {
        alert("파일을 추가해 주세요.");
        return;
      }
      this.title = "";
      this.did = "";
      this.files = [];
    },
    pc() {
      this.items = [];
    },
    web() {
      this.items = [];
    },
    search() {
      this.defaultSet();
      this.isFlss = true;
      this.items = this.flssItems;
    },
    link() {
      this.defaultSet();
      this.isLink = true;
    },
    pcResource() {
      this.defaultSet();
      this.items = this.pcResources;
      this.isPcResource = true;
    },
    like() {
      this.items = [];
    },
    defaultSet() {
      this.isPcResource = false;
      this.isFlss = false;
      this.isLink = false;
    },
    onFileChange(e) {
      let uploadFiles = e.target.files || e.dataTransfer.files;
      console.log(uploadFiles);
      if (uploadFiles.length) {
        this.uploadFile = uploadFiles[0];
      }
    },
    linkSelect() {
      this.$refs.link.show()
    },
    getFileUsage(i) {
      if (i % 4 === 0) {
        return "수업 전";
      }
      else if (i % 4 === 1) {
        return "도입";
      }
      else if (i % 4 === 2) {
        return "전개";
      }
      else if (i % 4 === 3) {
        return "정리";
      }
    },
    getFileUsageColor(i) {
      if (i % 4 === 0) {
        return "success";
      }
      else if ((i % 4 === 1) || (i % 4 === 2) || (i % 4 === 3)) {
        return "danger";
      }
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
}
.div1 {
  height: 70vh; /* Minimum height for IE */
  position: absolute;
  overflow: hidden;
  padding: 10px 20px;
}
.div2 {
  height: 66vh;
  position: absolute;
  overflow: hidden;
  padding: 10px 20px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.tableItem:hover {
  background-color: #f2f2f2;
}

.mtm-5 {
  margin-top: -14px;
}

.no-scrollbar {
  overflow-y: scroll;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.center {
  position: relative;
  left: 35%;
  transform: translateX(-50%);
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
