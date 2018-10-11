<template>
  <div id="make-class">
      <b-container class="mt-5">
      <b-row>
        <b-col cols="4">
          <div class="div1 border no-scrollbar">
            <label for="inputLive" class="mt-3">수업 제목</label>
            <b-button variant="success" size="sm" class="float-right mt-3" @click="makeClass">UPLOAD</b-button>
            <b-form-input
                  v-model="title"
                  class="mt-3"
                  type="text"
                  placeholder="Text input"></b-form-input>
            <b-list-group>
              <b-list-group-item class="flex-column align-items-start mt-3" v-for="(file, i) in files" :key="i">
                <p class="mb-1" style="overflow:hidden">
                  {{ file.fileName }}
                </p>
                <small>{{ file.fileExt }}</small>
                <small style="float:right">{{ file.date }}</small>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
        <b-col cols="4">
          <b-table hover :items="classList" @row-clicked="getFile"></b-table>    
          <b-modal ref="myModalRef" hide-footer :title="title">
            <div v-if="fileList" v-for="(file, i) in fileList" :key="i">
              <b-card @click="loadFile(file.File)">
                {{ file.File }}
              </b-card>
            </div>
          </b-modal>
        </b-col>
        <b-col cols="4">
          <b-table style="cursor:pointer" hover :items="items" @row-clicked="addFile"></b-table>       
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
      title: "",
      fileItems: [],
      items: [],
      files: [],
      classList: [],
      title: "",
      List: [],
      did: "",
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
            fileName: res.data[i].File
          };
          this.items.push(items);
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
      this.title = this.List[index].Title;
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
</style>
