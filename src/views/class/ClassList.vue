<template>
  <div id="class-list">
    <b-container>
      <b-row>
        <b-table class="mt-4" hover :items="items" @row-clicked="clickevent">
        </b-table>
        <!-- <b-card tag="article"
                style="max-width: 20rem;"
                class="mb-2">
          <p class="card-text">
            Title : 123
          </p>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card> -->
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
export default {
  name: "class-list",
  created() {
    this.$http
      .get(
        `http://flss.kr/api/lesson/list?cid=${
          this.$store.getters.getThisClass.cid
        }`
      )
      .then(res => {
        this.board = res.data;
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          let item = {
            제목: res.data[i].LessonName,
            학년: res.data[i].Syear,
            과목: res.data[i].SubjectName,
            날짜: res.data[i].AddTime
          };
          this.items.push(item);
        }
      });
  },
  data() {
    return {
      items: [],
      board: []
    };
  },
  methods: {
    clickevent(record, index) {
      this.$store.commit("setLesson", this.board[index]);
      this.$vuevent.$emit("test", "hello");
      this.$router.push({ path: "./lesson" });
    }
  }
};
</script>

<style>
</style>
