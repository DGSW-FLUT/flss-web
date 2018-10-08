<template>
    <div class="portfolio-item">

    </div>
</template>

<script>
export default {
    name: "portfolio-item",
    data() {
        return {

        }
    },
    props: ["portfolio"],
    methods: {
        add(i) {
        this.$vuevent.$emit("idx", i);
        }
  }
}
</script>

<style lang="scss">

</style>

