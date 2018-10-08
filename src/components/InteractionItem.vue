<template>
    <div class="interaction-item">
      <b-card no-body>
        <b-card-header v-if="InteractionItem.topic">
          {{ InteractionItem.topic }}
        </b-card-header>
        <b-card-body v-if="InteractionItem.content">
          {{ InteractionItem.content }}
        </b-card-body>
        <b-card-footer v-if="InteractionItem.type !== 1">
          <a :href="InteractionItem.link" v-if="InteractionItem.link">
            <link-prevue :url="InteractionItem.link">
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
          <div v-else-if="InteractionItem.file">
            <font-awesome-icon class="py-2" fas icon="paperclip" size="4x"/><br>
            {{ InteractionItem.file.name }}
            <font-awesome-icon class="py-1 float-right" fas icon="download" size="2x" @click="downloadFile"/>
          </div>
        </b-card-footer>
      </b-card>
    </div>
</template>

<script>
import LinkPrevue from "link-prevue";

export default {
  name: "interaction-item",
  props: ["InteractionItem"],
  components: {
    LinkPrevue
  },
  methods: {
    downloadFile() {}
  }
};
</script>

<style lang="scss">
html {
  text-decoration: none;
}
font-awesome-icon {
  cursor: pointer;
}
</style>
