<template>
    <div class="portfolio-item" @click="add(key)">
        {{portfolio.writer}} {{portfolio.file.name}} {{portfolio.file.date}}
    </div>
</template>

<script>
export default {
  name: "portfolio-item",
  props: ["portfolio", "i"],
  methods: {
    add(i) {
      console.log(i);
      this.$vuevent.$emit("idx", i);
    }
  }
};
</script>

<style lang="scss">
.selected {
  border: 1px solid red;
}
</style>
