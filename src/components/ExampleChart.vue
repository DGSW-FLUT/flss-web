<script>
import { Bar } from "vue-chartjs";

export default {
  name: "example-chart",
  extends: Bar,
  mounted() {
    this.renderChart({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Github Commits",
          backgroundColor: "#F87979",
          data: [40, 20, 12, 39, 10, 35, 40, 20, 12, 39, 10, 35]
        }
      ]
    });
  }
};
</script>