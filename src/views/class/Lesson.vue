<template>
  <div id="lesson">
    <b-container>
      <b-card 
              title="숫자의 덧셈과 뺄셈"
              tag="article"
              class="mt-3 mb-2">
        <p class="card-text">
          (설명)
        </p>              
        <b-embed type="iframe"
                aspect="16by9"
                src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                allowfullscreen
        ></b-embed>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "lesson",
  data() {
    return {};
  },
  created() {
    this.$vuevent.$on("test", function(text) {
      console.log(text);
    });
  }
};
</script>

<style>
</style>
