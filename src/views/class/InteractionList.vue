<template>
  <div id="interaction-list">
    <b-card class="mt-5" style="float:right">
      상호 작용 도구 메뉴 안내 <br><br>
      실시간 사용자들이 글을<br>
      남기거나, 파일업로드, 링크주소 탑재, 사진 및<br>
      동영상 등을 탑재할 수 있습니다.<br><br>
      상호작용 주제별 공유 링크를<br>
      생성하여 다른 SNS에 공유가<br>
      가능하며, 클래스팅 학급에<br>
      바로 공유도 가능합니다.<br><br>
      온라인으로 포스트잇을 사용하는 <br> 
      것으로 이해하시면 됩니다.     
    </b-card>
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
