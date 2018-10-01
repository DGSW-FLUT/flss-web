<template>
  <div id="interaction">
    <div class="mt-5"></div>
    <div class="container">
      <b-container>
        <b-row>
           <b-modal id="modal" ref="modal" @ok="okLink" @shown="clearLink" title="Enter Link">
             <b-form-group label-for="newInteractionLink" :state="linkState" :invalid-feedback="invalidLink">
              <b-form-input id="newInteractionLink" v-model.trim="newInteraction.link" type="text" placeholder="E.g. https://youtube.com" :state="linkState" />
            </b-form-group>
          </b-modal>
          <interaction-item class="col-md-4 col-sm-5 mb-4" v-for="(Interaction, i) in Interactions" :key="i" :InteractionItem="Interaction" />
          <div class="col-md-4 col-sm-5 mb-4">
            <b-card v-if="this.isadding === true" no-body class="mb-3">
              <b-card-header>
                <b-form-input placeholder="제목" v-model="newInteraction.topic"></b-form-input>
              </b-card-header>
              <b-card-body>
                <b-form-textarea id="newInteractionContent" v-model="newInteraction.content" placeholder="내용" :rows="2" :max-rows="4" :no-resize="true">
                </b-form-textarea>
              </b-card-body>
              <b-card-footer>
              <b-form inline class="icons ml-3">
                <font-awesome-icon class="py-2 mr-4" fas icon="upload" size="3x" @click="upload"/>
                <font-awesome-icon class="py-2 mr-4" fas icon="link" size="3x" v-b-modal.modal/>
                <label for="file_upload">
                  <font-awesome-icon class="py-2 mr-4" fas icon="folder" size="3x"/>
                </label>
                <b-form-file id="file_upload" v-show="false" />
                <font-awesome-icon class="py-2 mr-4" fas icon="trash-alt" size="3x" @click="trash"/>
              </b-form>
              </b-card-footer>
            </b-card>
          </div>
        </b-row>
        <b-button class="float-right fixed-right" variant="success" @click="adding">
          +
        </b-button>
      </b-container>
    </div>
  </div>
</template>

<script>
import InteractionItem from "@/components/InteractionItem";

export default {
  name: "Interaction",
  data() {
    return {
      newInteraction: {
        type: 1
      },
      Interactions: [],
      isadding: false
    };
  },
  methods: {
    adding() {
      this.isadding = true;
    },
    trash() {
      this.isadding = false;
      this.newInteraction = {};
    },
    upload() {
      console.log(this.Interactions);
      this.Interactions.push(this.newInteraction);
      this.newInteraction = {};
      this.isadding = false;
      alert("업로드 되었습니다");
    },
    okLink(evt) {

      if(!this.linkState) {
        alert("올바르지 않은 입력 형식 입니다.");
        return;
      }
      
      this.newInteraction.type = 2;
      this.$refs.modal.hide();

    },
    clearLink() {
      // this.newInteraction.link = '';
    }
  },
  components: {
    InteractionItem
  },
  computed: {
    linkState() {
      const urlreg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
      console.log(urlreg.test(this.newInteraction.link) + " -- "+this.newInteraction.link)
      return urlreg.test(this.newInteraction.link);
    },
    invalidLink() {
      if(!this.linkState){
        return "Please enter a valid link"
      }
      return "";
    }
  },
  created() {

  }
};
</script>

<style lang="scss">
.icons {
  font-awesome-icon {
    cursor: pointer;
  }

  input {
    display: none;
  }
}
</style>
