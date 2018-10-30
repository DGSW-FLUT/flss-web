<template>
  <div id="interaction-detail">
    <interaction-item v-for="(interaction,i) in Interactions" :key="i"></interaction-item>
  </div>
</template>

<script>
import InteractionItem from "@/components/InteractionItem";
export default {
  data() {
    return {
      Interactions: []
    }
  },
  created() {
    
  },
  components: {
    InteractionItem
  }
}
</script>

<style>

</style>
