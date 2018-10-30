<template>
  <div id="interaction-list">
    <b-container>
      <b-table class="mt-4" hover :items="InteractionLists" @row-clicked="interactionClickEvent">
     </b-table>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      InteractionLists: []
    }
  },
  methods: {
    interactionClickEvent(record, index) {
      this.$store.commit("setInteraction", this.InteractionLists[index]);
      this.$router.push({ path: "./interactionDetail" });
    }
  },
  created() {
    this.$http
    .get(`http://flss.kr/api/interaction/list?cid=${this.$store.getters.getThisClass.cid}`)
    .then(res => {
      console.log(res.data);
      res.data.forEach(temp => {
        this.InteractionLists.push({ "제목": temp.Topic});
      })
    })
  }
}
</script>

<style lang="scss">

</style>
