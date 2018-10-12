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
            <div style="cursor:pointer" v-if="fileList" v-for="(file, i) in fileList" :key="i">
              <b-card @click="loadFile(file.File)">
                {{ file.Name }}
              </b-card>
            </div>
          </b-modal>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
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
      });
  },
  data() {
    return {
      lessonTitle: "",
      fileList: [],
      List: [],
      classList: []
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
  .aligncenter{
  transform: translateX(-50%);
  left:50%;
  position: relative;
  }
</style>
