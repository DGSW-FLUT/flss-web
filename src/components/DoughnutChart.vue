<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "doughnut-chart",
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["chart-data", "options"],
  mounted() {
    this.renderChart(this.chartData);
    this.$vuevent.on('chartChange', () => {
      this.renderChart(this.chartData);
    });
  }
};
</script>
