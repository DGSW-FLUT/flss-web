<template>
  <div class="classroom-item">
    <!-- line 5 classroom -> class -->
    <b-card :title="classlist.name"
            :img-src="classlist.profile_image"
            img-top
            tag="article"
            class="mb-2">
      <b-button variant="primary" @click="goClassRoom()">둘러보기</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "classroom-item",
  props: ["classlist"],
  computed: {
    imageSrc() {
      let random = Math.floor(Math.random() * 25);
      return `https://picsum.photos/600/300/?image=${parseInt(random)}`;
    }
  },
  methods: {
    showRealName() {},
    goClassRoom() {
      this.$store.commit("setThisClass", this.classlist);
      this.$router.push({ path: "/class1" });
    }
  }
};
</script>

<style lang="scss">
</style>
