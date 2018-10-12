<template>
  <div id="class-list">
    <b-container>
      <b-tabs>
        <b-tab title="사전 영상" active class="table">
            <b-row>
              <b-table class="mt-4" hover :items="lessons" @row-clicked="lessonClickEvent">
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
        </b-tab>
        <b-tab title="평가 문제" class="table">
            <b-row>
              <b-table class="mt-4" hover :items="tests" @row-clicked="testClickEvent">
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
        </b-tab>
      </b-tabs>
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
        this.lessonsData = res.data;
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          let item = {
            제목: res.data[i].LessonName,
            학년: res.data[i].Syear,
            과목: res.data[i].SubjectName,
            날짜: res.data[i].AddTime
          };
          this.lessons.push(item);
        }
      });

    this.$http
      .get(
        `http://flss.kr/api/lesson/testList?cid=${
          this.$store.getters.getThisClass.cid
        }`
      )
      .then(res => {
        this.testsData = res.data;
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          let item = {
            제목: res.data[i].LessonName,
            학년: res.data[i].Syear,
            과목: res.data[i].SubjectName,
            날짜: res.data[i].AddTime
          };
          this.tests.push(item);
        }
      });
  },
  data() {
    return {
      lessons: [],
      tests: [],
      lessonsData: [],
      testsData: []
    };
  },
  methods: {
    lessonClickEvent(record, index) {
      this.$store.commit("setLesson", this.lessonsData[index]);
      this.$vuevent.$emit("test", "hello");
      this.$router.push({ path: "./lesson" });
    },
    testClickEvent(record, index) {
      this.$store.commit("setLesson", this.testsData[index]);
      this.$vuevent.$emit("test", "hello");
      this.$router.push({ path: "./lesson" });
    }
  }
};
</script>

<style lang="scss">
  .table {
    cursor: pointer;
  }
</style>
