<template>
  <div class="member-list">
    <b-container>
      <b-row>
        <b-col v-for="(member, i) in memberlist" :key="i" cols="2">
          <b-card
            :class="{selected : member.selected}"
            class="mb-4"
            img-top
            tag="article"
            @click="addCount(i)"
            style="text-align:center; cursor:pointer;">
            <font-awesome-icon class="py-2" fas icon="user" size="5x" />
          <p class="card-text">{{ i+1 + "." }} {{ member.Name }} </p>
          <p>{{ "상점 : " +  member.Count }}</p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "member-list",
  props: ["memberlist"],
  methods: {
    addCount(i) {
      this.$http
        .get(
          `http://flss.kr/api/reward/addPoint?uid=${
            this.memberlist[i].Uid
          }&point=${this.memberlist[i].Count+1}`
        )
        .then(res => {
          this.$http.get(
              `http://flss.kr/api/reward/getUser?token=${
                this.$store.getters.getToken
              }&cid=${this.$store.getters.getThisClass.id}`
            ).then(res =>{
              this.$vuevent.emit('memberlist', res.data)
            })
        });
    }
  }
};
</script>

<style>
.selected {
  border: 1px solid red;
}
</style>
