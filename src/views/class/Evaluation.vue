<template>
  <div id="evaluation">
    <b-container>
      <div class="mt-5"></div>
      <b-row>
        <b-card no-body class="col-md-4 p-5 m-3">
          <doughnut-chart :data="getStatisticData" />
        </b-card>
        <b-card no-body class="col-md-4 p-5 m-3">
          <bar-chart :data="barChartData" />
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
<<<<<<< HEAD
import BarChart from "@/components/BarChart";
=======
import BarChart from "@/components/BarChart"
import DoughnutChart from "@/components/DoughnutChart"
>>>>>>> feature/chart_page

export default {
  name: "evaluation",
  components: {
    BarChart,
    DoughnutChart
  },
  data() {
    return {
<<<<<<< HEAD
      chartData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
=======
      studentData: [
        {
          name: "김호진",
          questions: [
            {
              questionNum: 1,
              isCorrect: true
            },
            {
              questionNum: 2,
              isCorrect: false
            },
            {
              questionNum: 3,
              isCorrect: true
            }
          ]
        },
        {
          name: "남현욱",
          questions: [
            {
              questionNum: 1,
              isCorrect: false
            },
            {
              questionNum: 2,
              isCorrect: false
            },
            {
              questionNum: 3,
              isCorrect: true
            }
          ]
        },
        {
          name: "남인욱",
          questions: [
            {
              questionNum: 1,
              isCorrect: true
            },
            {
              questionNum: 2,
              isCorrect: true
            },
            {
              questionNum: 3,
              isCorrect: true
            }
          ]
        },
        {
          name: "박서희",
          questions: [
            {
              questionNum: 1,
              isCorrect: true
            },
            {
              questionNum: 2,
              isCorrect: false
            },
            {
              questionNum: 3,
              isCorrect: false
            }
          ]
        },
        {
          name: "장한슬",
          questions: [
            {
              questionNum: 1,
              isCorrect: false
            },
            {
              questionNum: 2,
              isCorrect: false
            },
            {
              questionNum: 3,
              isCorrect: false
            }
          ]
        },
        {
          name: "황이삭",
          questions: [
            {
              questionNum: 1,
              isCorrect: true
            },
            {
              questionNum: 2,
              isCorrect: true
            },
            {
              questionNum: 3
            }
          ]
        }
      ],
      barChartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
>>>>>>> feature/chart_page
        datasets: [
          {
            label: "Github Commits",
            backgroundColor: "#F87979",
            data: [40, 20, 12, 39, 10, 35, 40, 20, 12, 39, 10, 35]
          }
        ]
      },
      doughnutChartData: {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [
          {
            backgroundColor: ["red", "blue", "green"],
            data: [20, 30, 50]
          }
        ]
      }
<<<<<<< HEAD
    };
  }
=======
    }
  },
  computed: {
    getStatisticData() {
      let data = {};
      let questionData = {
        correct: 0,
        wrong: 0,
        notSubmitted: 0
      };

      this.studentData.forEach(student => {
        student.questions.forEach(question => {
          if (question.isCorrect) {
            questionData.correct++;
          }
          else if (question.isCorrect === false) {
            questionData.wrong++;
          }
          else {
            questionData.notSubmitted++;
          }
        });
      });

      data.labels = ["정답", "오답", "미제출"];
      data.datasets = [
        {
          backgroundColor: ["green", "red", "#d6d6d6"],
          data: [questionData.correct, questionData.wrong, questionData.notSubmitted]
        }
      ];

      return data;
    }
  },
>>>>>>> feature/chart_page
};
</script>

<style lang="scss">
</style>
