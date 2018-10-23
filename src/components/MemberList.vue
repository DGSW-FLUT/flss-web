<template>
  <div class="member-list">
    <b-container>
      <b-row>
        <b-col v-for="(member, i) in memberlist" :key="i" cols="2">
          <b-card
            :class="{selected : member.selected}"
            class="mb-4"
            :img-src="member.profile"
            img-top
            tag="article"
            @click="prizeEvent(i)"
            style="text-align:center; cursor:pointer;">
          <p class="card-text">{{ i+1 + "." }} {{ member.name }} </p>
          <p>{{ "상점 : " +  member.count }}</p>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
           <b-button class="mt-3" style="float:right;" variant="primary" @click="prize()" v-if="isTeacher">상점 주기</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "member-list",
  data() {
    return {
      prizeIdx: [],
      newMemberList: [],
      pointArray: [],
      uidArray: [],
      prizeMemberList: []
    };
  },
  computed : {
    isTeacher(){
      if(this.$store.getters.getUserInfo.role === "teacher"){
        return true;
      } else{
        return false;
      }
    }
  },
  props: ["memberlist"],
  methods: {
    prizeEvent(i) {
      if (this.$store.getters.getUserInfo.role === "teacher") {
        this.memberlist[i].selected = !this.memberlist[i].selected;
        if (this.memberlist[i].selected) {
          this.prizeIdx.push(i);
        } else if (!this.memberlist[i].selected) {
          var idx = this.prizeIdx.indexOf(i);
          this.prizeIdx.splice(idx, 1);
        }
      }
    },
    prize() {
      this.prizeIdx.forEach(idx => {
        this.uidArray.push(this.memberlist[idx].uid);
        this.pointArray.push(this.memberlist[idx].count + 1);
      });

      if (!this.prizeIdx.length) {
        alert("학생을 선택해주세요.");
        return;
      }

      this.$http
        .post(`http://flss.kr/api/reward/addPoint`, {
          uid: this.uidArray,
          point: this.pointArray
        })
        .then(res => {
          this.$http
            .get(
              `http://flss.kr/api/reward/getUser?token=${
                this.$store.getters.getToken
              }&cid=${this.$store.getters.getThisClass.id}`
            )
            .then(res => {
              res.data.forEach(data => {
                let member = {
                  cid: data.Cid,
                  count: data.Count,
                  name: data.Name,
                  profile: data.Profile,
                  uid: data.Uid,
                  selected: false
                };

                this.newMemberList.push(member);
              });

              this.memberlist = this.newMemberList;
            });
        });

      alert(`${this.prizeIdx.length}명의 학생에게 상점을 주었습니다!`);

      this.newMemberList = [];
      this.uidArray = [];
      this.pointArray = [];
      this.prizeIdx = [];

      this.memberlist.forEach(member => {
        member.selected = false;
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
