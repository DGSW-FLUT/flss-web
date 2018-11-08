<template>
  <div id="class-list">
    <b-container class="mt-5">
      <b-tabs>
        <b-tab title="사전 영상" active class="table">
            <b-row>
              <span class="aligncenter mt-5" v-if="!lessons.length"> 
                <font-awesome-icon class="py-2 ml-5 mr-5 " fas icon="exclamation-circle" size="10x"/><br>
                <span style="font-size:2em">등록된 사전 영상이 없습니다.</span>
              </span>
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
              <span class="aligncenter mt-5" v-if="!tests.length"> 
                <font-awesome-icon class="py-2 ml-5 mr-5" fas icon="exclamation-circle" size="10x"/><br>
                <span style="font-size:2em">등록된 평가가 없습니다.</span>
              </span>
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
            날짜: res.data[i].UpTime
          };
          this.lessons.push(item);
        }
        this.lessons.reverse();
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
          console.log(item);
          this.tests.push(item);
        }
        this.tests.reverse();
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

.aligncenter {
  transform: translateX(-50%);
  left: 50%;
  position: relative;
}
</style>
