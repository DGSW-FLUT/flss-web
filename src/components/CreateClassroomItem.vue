<template>
  <div class="create-classroom-item">
    <b-card header="새 학급 만들기"
            tag="article"
            class="mb-2">
      <p class="card-text">클래스팅에서 학급을 생성하여 FLSS을 이용해보세요</p>
      <b-button variant="success" href="https://www.classting.com/" target="_blank">클래스팅으로</b-button>
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
