<template>
  <div class="classroom-item">
    <b-card :title="classroom.name"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
      <b-button href="#" variant="primary">둘러보기</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "classroom-item",
  props: ["classroom"]
};
</script>

<style>
</style>
