<template>
  <div id="interaction-list">
    <b-container>
      <b-button v-b-modal.addInteraction class="float-right mt-5" variant="primary">추가</b-button>
      <b-table class="mt-4" hover :items="InteractionLists" @row-clicked="interactionClickEvent">
     </b-table>
    </b-container>
    <b-modal id="addInteraction" title="상호작용 추가" @ok="addInteraction">
      <b-form-input v-model="InteractionName" type="text" placeholder="상호작용 제목을 입력해 주세요"></b-form-input>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      InteractionLists: [],
      InteractionName: "",
      Interactions: []
    };
  },
  methods: {
    interactionClickEvent(record, index) {
      this.$store.commit("setInteraction", this.Interactions[index]);
      this.$router.push({ path: "./interactionDetail" });
    },
    addInteraction() {
      if (this.InteractionName != "") {
        this.$http
          .get(
            `http://flss.kr/api/interaction/add?cid=${
              this.$store.getters.getThisClass.cid
            }&topic=${this.InteractionName}`
          )
          .then(res => {
            console.log(res.data);
            this.InteractionLists.push({ 제목: this.InteractionName });
            this.Interactions.push({
              Aid: res.data,
              Topic: this.InteractionName
            });
            this.InteractionName = "";
          });
      }
    }
  },
  created() {
    this.$http
      .get(
        `http://flss.kr/api/interaction/list?cid=${
          this.$store.getters.getThisClass.cid
        }`
      )
      .then(res => {
        console.log(res.data);
        this.Interactions = res.data;
        res.data.forEach(temp => {
          this.InteractionLists.push({ 제목: temp.Topic });
        });
      });
  }
};
</script>

<style lang="scss">
</style>
