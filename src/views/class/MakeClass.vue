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
                <small>{{ file.fileExt }}</small>
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
        <!-- <b-col cols="4">
          <b-table hover :items="classList" @row-clicked="getFile"></b-table>    
          <b-modal ref="myModalRef" hide-footer :title="lessonTitle">
            <div v-if="fileList" v-for="(file, i) in fileList" :key="i">
              <b-card @click="loadFile(file.File)">
                {{ file.File }}
              </b-card>
            </div>
          </b-modal>
        </b-col> -->
        <b-col v-if="did" cols="6">
          <b-nav>
              <b-nav-item active @click="search()">FLSS 검색</b-nav-item>
          </b-nav>
          <div  class="div1 border no-scrollbar" style="min-width:100%">
            <span class="center" v-if="!items.length"> 
              <font-awesome-icon class="py-2 ml-5 mr-5" fas icon="exclamation-circle" size="4x"/><br>
              등록된 파일이 없습니다
            </span>
            <b-table style="cursor:pointer" hover :items="items" @row-clicked="addFile"></b-table>      
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
      title: "",
      fileItems: [],
      items: [],
      files: [],
      classList: [],
      List: [],
      did: "",
      flssItems: [],
      fileList: []
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
  computed: {},
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
        });
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
          console.log("데이터" + res.data);
        });
      console.log(this.fileItems[index]);
      let name = this.items[index].fileName;
      let fileExt = name.substring(name.lastIndexOf("."), name.length);
      this.items[index].fileExt = fileExt;
      this.files.push(this.items[index]);
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
      this.items = this.flssItems;
    },
    like() {
      this.items = [];
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
</style>
