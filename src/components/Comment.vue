<template>
  <div class="comment">
    <b-card class="text-center border-radius mt-3" style="width:fit-content; text-align: left;">
      {{ comment.Name }} : {{ comment.Content }} 
    </b-card>
    <span class="ml-5">{{ comment.Date }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: ["comment"]
}
</script>

<style lang="scss">
  .border-radius{
    border-radius: 30px;
  }
</style>
