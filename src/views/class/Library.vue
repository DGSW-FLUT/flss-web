<template>
  <div id="library">
    <b-container>
      <b-row class="mt-5">
        <b-col v-for="(file, i) in files" :key="i" cols="3">
              <b-card no-body
                  style="max-width: 20rem;"
                >
              <h4 slot="header">{{ file.text }}</h4>
              <b-card-body class="border-bottom">
                <p class="card-text">
                    (File Image)
                </p>
              </b-card-body>
              <b-card-body>
                <p class="card-text">
                  {{ file.fileName }}
                </p>
              </b-card-body>
              <b-card-footer>{{ file.date }}</b-card-footer>
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
              <b-form-input v-model="text"></b-form-input>
            </b-input-group>
            <b-form-file class="mt-4" v-model="file" ref="fileRef" placeholder="Choose a file..."></b-form-file>
          </b-modal>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "library",
  data() {
    return {
      files: [
        {
          text: "제목1",
          fileName: "flut.pptx",
          date: ""
        }
      ],
      text: "",
      file: ""
    };
  },
  // 가짜 시간 함수: 나중에 삭제
  created() {
    this.files.forEach(file => {
      let past = this.$moment("20180928 2:31:12", "YYYYMMDD H:mm:ss").format(
        "YYYY-MM-DD H:mm:ss"
      );
      file.date = past;
    });
  },
  methods: {
    clear() {
      this.text = "";
      this.$refs.fileRef.reset();
    },
    addFile() {
      let current = this.$moment().format("YYYY-MM-DD H:mm:ss");
      let newFile = {
        text: this.text,
        fileName: this.file.name,
        date: current
      };
      this.files.push(newFile);
    }
  }
};
</script>

<style>
</style>
