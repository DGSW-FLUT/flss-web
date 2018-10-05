<template>
  <div id="evaluation">
    <b-container>
      <div class="mt-5"></div>
      <b-row>
        <b-card no-body class="p-5 col-md-4 m-3">
          <bar-chart :data="chartData" />
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart";

export default {
  name: "evaluation",
  components: {
    BarChart
  },
  data() {
    return {
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
        datasets: [
          {
            label: "Github Commits",
            backgroundColor: "#F87979",
            data: [40, 20, 12, 39, 10, 35, 40, 20, 12, 39, 10, 35]
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss">
</style>
