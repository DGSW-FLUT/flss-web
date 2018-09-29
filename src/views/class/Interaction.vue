<template>
    <div id="inter-action">
        <div class="mt-5"></div>
        <div class="container">
            <b-container>
                <b-card v-if="this.isadding === true" no-body class="mb-3">
                      <b-card-header>
                         <b-form-input placeholder="제목" v-model="newInteraction.title"></b-form-input>
                      </b-card-header>
                      <b-card-body>
                        <b-form-textarea id="newInteractionValue"
                                        v-model="newInteraction.value"
                                        placeholder="내용"
                                        :rows="2"
                                        :max-rows="4"
                                        :no-resize="true">
                        </b-form-textarea>
                      </b-card-body>
                      <b-card-footer>
                        <div class="icons">
                            <img src="./../../assets/images.png" alt="test" @click="upload">
                            <img src="./../../assets/images.png" alt="test">
                            <img src="./../../assets/images.png" alt="test">
                            <b-input-group>
                              <label for="file_upload">
                                  <img src="./../../assets/images.png" alt="test">
                              </label>
                              <b-input-file id="file_upload" />
                            </b-input-group>
                            <img src="./../../assets/images.png" alt="test" @click="trash">
                        </div>
                      </b-card-footer>
                </b-card>
                <b-card>
                  <b-card-header>
                    hi
                  </b-card-header>
                  <b-card-body>
                    meet
                  </b-card-body>
                  <b-card-footer>
                    bye
                  </b-card-footer>
                </b-card>
                    <b-button class="float-right fixed-right" variant="success" @click="adding">
                        +
                    </b-button>
            </b-container>  
        </div>
    </div>    
</template>

<script>
export default {
  name: "Interaction",
  data() {
    return {
      newInteraction: {},
      isadding: true
    };
  },
  methods: {
    adding() {
      // if(this.isadding) {
      //     this.isadding = false;
      //     return;
      // }
      this.isadding = true;
    },
    trash() {
      this.isadding = false;
      this.newInteraction = {};
    },
    upload() {
      alert("업로드됫네요");
      this.newInteraction = {};
    }
  }
};
</script>

<style lang="scss">
.icons {
  img {
    display: inline-block;
    max-width: 40px;
    margin: 8px;
    cursor: pointer;
  }

  input {
    display: none;
  }
}
</style>
