<template>
  <div id="evaluation">
    <b-container>
      <div class="mt-5"></div>
      <b-card no-body class="p-5 col-md-4">
        <example-chart />
      </b-card>
    </b-container>
  </div>
</template>

<script>
import ExampleChart from "@/components/ExampleChart"

export default {
  name: "evaluation",
  components: {
    ExampleChart
  },
  data() {
    return {

    }
  }
};
</script>

<style lang="scss">

</style>
