<template>
  <div id="evaluation">
    <b-container>
      <div class="mt-5"></div>
      <b-row>
      <b-dropdown text="수업 선택" variant="success" class="offset-md-10 col-md-2">
        <b-dropdown-item v-for="lesson in lessons" :key="lesson.Lno" @click="getLessonResult(lesson.Lno)">
          {{ lesson.LessonName }}
        </b-dropdown-item>
      </b-dropdown>
      </b-row>
      <b-row>
        <b-card no-body class="col-md-4 p-5 m-3">
          <doughnut-chart :chart-data="chart" />
        </b-card>
      </b-row>
      <div v-if="cardRender">
        <!-- <b-row>
          <b-card v-for="student in studentData" :key="student.id" class="col-sm-4 col-md-3 mb-3">
            {{student.name}} {{ student.answerStatus }}
          </b-card>
        </b-row> -->
        <b-table responsive bordered hover :items="studentData" :fields="tableFields" />
      </div>
    </b-container>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart";
import DoughnutChart from "@/components/DoughnutChart";

export default {
  name: "evaluation",
  components: {
    BarChart,
    DoughnutChart
  },
  data() {
    return {
      lessons: [],
      selectedLesson: "",
      studentData: [],
      tableFields: [
        {
          key: "name",
          label: "이름",
          sortable: true
        },
        {
          key: "answerStatus",
          label: "제출 현황",
          sortable: true
        }
      ],
      chart: {
        labels: ["정답", "오답", "미제출"],
        datasets: [
          {
            backgroundColor: ["green", "red", "#d6d6d6"],
            data: [0, 0, 0]
          }
        ]
      },
      cardRender: false
    };
  },
  // computed: {
  //   async studentTableData() {
  //     let ar = [];
  //     let ob = {
  //       name: "",
  //       answerStatus: ""
  //     };

  //     this.studentData.forEach(student => {
  //       ob.name = student.name;
  //       ob.answerStatus = student.answerStatus;
  //       ar.push(ob);
  //     });

  //     return ar;
  //   }
  // },
  async created() {
    this.lessons = await this.$http.get(
      `http://flss.kr/api/lesson/list?cid=${
        this.$store.getters.getThisClass.cid
      }`
    );
    this.lessons = await this.lessons.data;
    this.studentData = this.$store.getters.getMemberList.filter(
      student => student.role !== "teacher"
    );
    this.studentData.forEach(student => {
      student.answerStatus = "";
    });
  },
  computed: {},
  methods: {
    async getLessonResult(Lno) {
      try {
        this.cardRender = false;

        let Qid = -1;
        Qid = await this.$http.get(
          `http://flss.kr/api/lesson/showQuiz?lno=${Lno}&type=before`
        );
        Qid = await Qid.data[0].Qid;

        let userData = [];
        userData = await this.$http.get(
          `http://flss.kr/api/lesson/resultQuiz?qid=${Qid}`
        );
        userData = await userData.data;

        this.chart.datasets[0].data[0] = 0;
        this.chart.datasets[0].data[1] = 0;
        this.chart.datasets[0].data[2] = parseInt(this.studentData.length);

        await this.studentData.forEach(student => {
          student.answerStatus = "미제출";
          student._cellVariants = { answerStatus: "light" };
        });

        await userData.forEach(data => {
          if (data.Choice === data.Ranswer) {
            this.studentData.forEach(student => {
              if (student.id === data.Cid) {
                student.answerStatus = "정답";
                student._cellVariants = { answerStatus: "success" };
              }
            });
            this.chart.datasets[0].data[0]++;
            this.chart.datasets[0].data[2]--;
          } else if (data.Choice !== data.Ranswer) {
            this.studentData.forEach(student => {
              if (student.id === data.Cid) {
                student.answerStatus = "오답";
                student._cellVariants = { answerStatus: "danger" };
              }
            });
            this.chart.datasets[0].data[1]++;
            this.chart.datasets[0].data[2]--;
          }
        });
        await this.$vuevent.emit("chartChange");
        await console.log(this.studentData);

        this.cardRender = true;
      } catch (ex) {
        alert("데이터를 찾을 수 없습니다!");
      }
    },
    getStudentAnswerStatus(student) {
      let string = "";
      if (student.isAnswer === 1) string = "정답";
      else if (student.isAnswer === 0) string = "오답";
      else if (student.isAnswer === -1) string = "미제출";
      return string;
    }
  }
};
</script>

<style lang="scss">
</style>
