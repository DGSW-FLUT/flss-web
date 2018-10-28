<template>
  <div class="comment">
     {{ comment.Name }} <br> 
     {{ comment.Content }} <br>
    {{ comment.Date }}
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

</style>
