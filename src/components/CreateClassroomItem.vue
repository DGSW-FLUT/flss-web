<template>
  <div class="create-classroom-item">
    <b-card header="새 학급 만들기"
            tag="article"
            class="mb-2">
      <p class="card-text">학생과 함께하는, 새로운 학급을 지금 만들어 보세요.</p>
      <b-button variant="success" v-b-modal.modalPrevent>+</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "create-classroom-item",
  computed: {
    imageSrc() {
      let random = Math.floor(Math.random() * 25);
      return `https://picsum.photos/600/300/?image=${parseInt(random)}`;
    }
  }
};
</script>

<style>
</style>
