<template>
  <div id="interaction">
    <div class="mt-5"></div>
    <div class="container">
      <b-container>
        <b-row>
           <b-modal id="modal" ref="modal" @ok="okLink" title="Enter Link">
             <b-form-group label-for="newInteractionLink" :state="linkState" :invalid-feedback="invalidLink">
              <b-form-input id="newInteractionLink" v-model.trim="newInteraction.Link" type="text" placeholder="E.g. https://youtube.com" :state="linkState" />
            </b-form-group>
          </b-modal>
          <interaction-item class="col-md-4 col-sm-5 mb-4" v-for="(Interaction, i) in Interactions" :key="i" :InteractionItem="Interaction" :idx="i"/>
          <div class="col-md-4 col-sm-5 mb-4">
            <b-card v-if="this.isAdding === true" no-body class="mb-3">
              <b-card-header>
                <b-form-input placeholder="제목" v-model="newInteraction.Topic"></b-form-input>
              </b-card-header>
              <b-card-body>
                <b-form-textarea id="newInteractionContent" v-model="newInteraction.Content" placeholder="내용" :rows="2" :max-rows="4" :no-resize="true">
                </b-form-textarea>
              </b-card-body>
              <b-card-footer>
              <b-form inline v-if="!isAddingNow" class="icons ml-3">
                <font-awesome-icon v-b-tooltip.hover title="올리기" class="py-2 mr-4" fas icon="upload" size="3x" @click="upload"/>
                <!-- <a href="#" class="py-2 mr-4" @click="upload">업로드</a> -->
                <font-awesome-icon v-b-tooltip.hover title="링크 추가" class="py-2 mr-4" fas icon="link" size="3x" v-b-modal.modal  v-if="!isAttach"/>
                <label for="file_upload">
                  <font-awesome-icon v-b-tooltip.hover title="파일 추가" class="py-2 mr-4" fas icon="folder" size="3x" @click="addFile" v-if="!isAttach"/>
                </label>
                <b-form-file id="file_upload" v-model="newInteraction.File" v-show="false"/>
                <font-awesome-icon v-b-tooltip.hover title="삭제" class="py-2 mr-4" fas icon="trash-alt" size="3x" @click="trash"/>
              </b-form>
              </b-card-footer>
              <b-card-footer v-if="newInteraction.Link">
                <link-prevue :url="newInteraction.Link">
                  <template slot-scope="props">
                    <b-card :title="props.title"
                            :img-src="props.img"
                            :img-alt="props.title"
                            img-top
                            style="max-width: 20rem;"
                            class="mb-2">
                      <small class="text-muted">
                        {{ props.description }}
                      </small>
                    </b-card>
                  </template>
                </link-prevue>
                <b-button variant="success" class="float-right" @click="clearLink">-</b-button>
              </b-card-footer>
              <b-card-footer v-else-if="newInteraction.File">
                <font-awesome-icon class="py-2" fas icon="paperclip" size="5x"/><br>
                {{ newInteraction.File.name }}
                <b-button variant="success" class="float-right" @click="clearFile">-</b-button>
              </b-card-footer>
            </b-card>
          </div>
        </b-row>
        <b-button v-b-tooltip.hover title="추가" class="float-right fixed-right" variant="success" @click="adding">
          추가
        </b-button>
        <b-button v-if="$store.getters.isTeacher" class="float-right fixed-right" variant="danger" @click="removeAll">
          전체 삭제
          <!-- <font-awesome-icon fas icon="trash" size="1x"/> -->
        </b-button>
      </b-container>
    </div>
  </div>
</template>

<script>
import InteractionItem from "@/components/InteractionItem";
import LinkPrevue from "link-prevue";
import io from "socket.io-client";
var client;
if (location.port)
  client = io(location.origin.replace(":" + location.port, "") + ":3030");
else client = io(location.origin + ":3030");

export default {
  name: "Interaction",
  data() {
    return {
      newInteraction: {
        type: 1
      },
      Interactions: [],
      isAdding: false,
      isAttach: false,
      isAddingNow: false
    };
  },
  methods: {
    adding() {
      this.isAdding = true;
    },
    trash() {
      this.isAdding = false;
      this.isAttach = false;
      this.newInteraction = {};
    },
    remove() {
      this.Interactions = [];
    },
    removeAll() {
      this.Interactions = [];
      client.emit("deleteAll");
    },
    upload(e) {
      this.newInteraction.Name = this.$store.getters.getUserInfo.name
      if (this.newInteraction.File) {
        this.isAddingNow = true;
        const fdata = new FormData();
        fdata.append("file", this.newInteraction.File);
        this.$http
          .post(`http://flss.kr/api/interaction/addFile`, fdata)
          .then(data => {
            console.log(data);
            if (data.status == 200) {
              this.newInteraction.file = data.data;
              client.emit("upload", this.newInteraction);
              // this.newInteraction.isme = true;
              this.newInteraction = {};
              this.isAdding = false;
              this.isAttach = false;
              this.isAddingNow = false;
            } else {
              alert("upload Error");
            }
          });
      } else {
        console.log(JSON.stringify(this.newInteraction));
        client.emit("upload", this.newInteraction);
        // this.newInteraction.isme = true;
        // this.Interactions.push(this.newInteraction);
        this.newInteraction = {};
        this.isAdding = false;
        this.isAttach = false;
        this.isAddingNow = false;
        // alert("업로드 되었습니다");
      }
    },
    okLink(evt) {
      evt.preventDefault();
      if (!this.linkState) {
        alert("올바르지 않은 입력 형식 입니다.");
        return;
      } else {
        this.isAttach = true;
        this.newInteraction.type = 2;
        this.$refs.modal.hide();
      }
    },
    clearLink() {
      this.newInteraction.Link = "";
      this.isAttach = false;
    },
    clearFile() {
      this.newInteraction.File = "";
      this.isAttach = false;
    },
    addFile() {
      this.isAttach = true;
      this.newInteraction.type = 3;
    },
    deleteItem(idx) {
      console.log(idx);
      client.emit("delete", idx, ({ success }) => {
        if (success) this.Interactions.splice(this.Interactions.findIndex((e) => e.Iid == idx), 1);
      });
    }
  },
  mounted() {
    console.log("mounted", this.$store.getters.getInteraction.Aid);
    client.emit(
      "join",
      { name: this.$store.getters.getInteraction.Aid },
      data => {
        this.Interactions = data;
      }
    );

    client.on("upload", data => {
      console.log(data)
      this.Interactions.push(data);
    });
    client.on("meupload", data => {
      console.log(data)
      data.isme = true;
      this.Interactions.push(data)
    })
    client.on("deleteAll", data => {
      this.remove();
    });
    client.on("delete", data => {
      this.Interactions.splice(this.Interactions.findIndex((e) => e.Iid == data), 1);
    });
    this.$vuevent.on("itemDelete", this.deleteItem);
  },
  destroyed() {},
  components: {
    LinkPrevue,
    InteractionItem
  },
  computed: {
    linkState() {
      const urlreg = /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
      return urlreg.test(this.newInteraction.Link);
    },
    invalidLink() {
      if (!this.linkState) {
        return "Please enter a valid link";
      }
      return "";
    }
  },
  created() {}
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
