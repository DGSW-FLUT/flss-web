<template>
  <div id="select-class">
    <div class="mt-5"></div>
    <b-container>
      <div class="d-inline">가입한 클래스룸 <span class="classroom-number">{{ classrooms.length }}</span></div>
      <b-row class="mt-4">
          <!-- <create-classroom-item /> -->
          <classroom-item class="col-md-3 col-sm-4 mb-4" v-for="(classroom, i) in classrooms" :key="i" :classroom="classroom" />
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
        },
        {
          name: "DARKROOM"
        },
        {
          name: "클래스 5"
        },
        {
          name: "클래스 6"
        }
      ]
    };
  },
  created() {
    this.classrooms.forEach(classroom => {
      if (classroom.name.length >= 12) {
        classroom.showName = classroom.name.slice(0, 9) + "...";
      } else {
        classroom.showName = classroom.name;
      }
    });
  }
};
</script>

<style lang="scss">
  .classroom-number {
    font-weight: bold;
    font-size: 15px;
  }
</style>
