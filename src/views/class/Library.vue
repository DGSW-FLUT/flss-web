<template>
  <div id="library">
    <b-container>
      <b-row class="mt-5" v-for="(file, i) in files" :key="i">
        <b-col>
              <b-card no-body>
              <h4 slot="header">{{ file.title }}</h4>
              <div class="border-bottom">
                  <font-awesome-icon class="py-2" fas icon="paperclip" size="2x" />
                  {{ file.fileName }}
              </div>
              <b-card-body>
                <p class="card-text">
                  <pre>{{ file.article }}</pre>
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
              <b-form-input v-model="title" />
            </b-input-group>
            <b-input-group class="mt-4" prepend="본문">
              <b-form-textarea
                    style="resize:none"
                     v-model="article"
                     :rows="3" />
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
          title: "참고1",
          article : "참고할 만한 자료를 올려두었어요.",
          fileName: "flut.pptx",
          date: ""
        }
      ],
      title: "",
      article : "",
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
        title: this.title,
        article : this.article,
        fileName: this.file.name,
        date: current
      };
      console.log(this.file);
      this.files.push(newFile);
    }
  }
};
</script>

<style>
</style>
