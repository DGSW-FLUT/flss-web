<template>
  <div class="classroom-item">
    <b-card :title="classroom.name"
            :img-src="imageSrc"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2">
      <b-button href="#" variant="primary">둘러보기</b-button>
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
  }
};
</script>

<style lang="scss">
</style>
