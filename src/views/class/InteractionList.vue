<template>
  <div id="interaction-list">
    <b-table class="mt-4" hover :items="Interactions" @row-clicked="interactionClickEvent">
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Interactions: []
    }
  },
  methods: {
    interactionClickEvent(record, index) {
      this.$store.commit("setInteraction", this.Interactions[index]);
      this.$router.push({ path: "./interactionDetail" });
    }
  },
  created() {
    this.$http
    .get(`http://flss.kr/api/interaction/list?cid=${this.$store.getters.getThisClass.cid}`)
    .then(res => {
      console.log(res.data);
    })
  }
}
</script>

<style lang="scss">

</style>
