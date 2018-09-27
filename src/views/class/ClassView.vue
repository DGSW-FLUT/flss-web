<template>
  <div id="class-view">
    <class-navbar :menus="menus" />
    <router-view />
  </div>
</template>

<script>
import ClassNavbar from "@/components/ClassNavbar"

export default {
  name: 'class-view',
  components: {
    ClassNavbar
  },
  data() {
    return {
      menus: [

      ]
    }
  }
};
</script>

<style lang="scss">

</style>
