<template>
  <div id="select-class">
    <div class="mt-5"></div>
    <b-container>
      <div class="d-inline lead">가입한 클래스룸 <span class="classroom-number">3</span></div>
      <b-row>
        <b-col cols="4">
          <create-classroom-item />
          <classroom-item v-for="(classroom, i) in classrooms" :key="i" :classroom="classroom" />
          <!-- FIXME: 한 줄에 lg, md 4개, sm 3개 -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ClassroomItem from "@/components/ClassroomItem";

export default {
  name: "select-class",
  components: {
    ClassroomItem
  },
  data() {
    return {
      classrooms: [
        {
          name: "북삼초 1학년 1반"
        },
        {
          name: "대구소프트웨어고등학교 탐구반"
        },
        {
          name: "FLUT"
        }
      ]
    };
  },
  created() {
    this.classrooms.forEach(classroom => {
      if (classroom.name.length >= 12) {
        classroom.name = classroom.name.slice(0, 12) + "...";
      }
    });
  }
};
</script>

<style lang="scss">
</style>
