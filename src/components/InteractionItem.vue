<template>
    <div class="interaction-item">
      <b-card no-body>
        <b-card-header>
          {{ InteractionItem.Topic }}
          <b-button class="float-right" variant="danger" size="sm" v-if="InteractionItem.isme" @click="deleteItem">삭제</b-button>
        </b-card-header>
        <b-card-body v-if="InteractionItem.Content">
          {{ InteractionItem.Content }}
        </b-card-body>
        <b-card-footer v-if="InteractionItem.type !== 1">
          <a :href="InteractionItem.Link" v-if="InteractionItem.Link">
            <link-prevue :url="InteractionItem.Link">
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
          </a>
          <div v-else-if="InteractionItem.file" @click="downloadFile" class="interactionFile">
            <div v-if="!imgMode">
              <font-awesome-icon class="py-2" fas icon="paperclip" size="4x"/><br>
              {{ InteractionItem.file.substr(13) }} 
            </div>
            <b-img :src="'http://flss.kr/interactionItem/' + InteractionItem.file" class="w-100" v-if="imgMode" @error="imgMode = false"/>
          </div>
        </b-card-footer>
      </b-card>
    </div>
</template>

<script>
import LinkPrevue from "link-prevue";

export default {
  name: "interaction-item",
  data() {
    return {
      imgMode: true
    };
  },
  props: ["InteractionItem", "idx"],
  components: {
    LinkPrevue
  },
  methods: {
    downloadURI(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadFile() {
      console.log(this.InteractionItem.file);
      this.downloadURI(
        "http://flss.kr/interactionItem/" + this.InteractionItem.file,
        this.InteractionItem.file.substr(13)
      );
      // window.open('http://flss.kr/interactionItem/' + this.InteractionItem.realFile)
    },
    deleteItem() {
      this.$vuevent.emit("itemDelete", this.idx);
      console.log("send", this.idx);
    }
  }
};
</script>

<style lang="scss">
html {
  text-decoration: none;
}
.interactionFile {
  cursor: pointer;
}
</style>
