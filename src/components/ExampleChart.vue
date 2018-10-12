<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: "example-chart",
  extends: Doughnut,
  mounted() {
    this.renderChart({
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
          backgroundColor: ["red", "blue", "green"],
          data: [40, 20, 12, 39, 10, 35, 40, 20, 12, 39, 10, 35],
          devicepixelRatio: "16by9"
        }
      ]
    });
  }
};
</script>
