<template>
  <div class="classroom-item">
    <b-card :title="classroom.showName"
            :img-src="imageSrc"
            :img-alt="classroom.name"
            img-top
            tag="article"
            class="mb-2">
      <b-button variant="primary" @click="main()">둘러보기</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "classroom-item",
  props: ["classroom"],
  computed: {
    imageSrc() {
      let random = Math.floor(Math.random() * 25);
      return `https://picsum.photos/600/300/?image=${parseInt(random)}`;
    }
  },
  methods: {
    showRealName() {},
    main() {
      this.$router.push({ name: "main" });
    }
  }
};
</script>

<style lang="scss">
</style>
