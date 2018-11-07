<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    document.domain = "flss.kr";
  }
};
</script>


<style lang="scss">
* {
  font: {
    family: "Spoqa Han Sans", sans-serif;
  }
}
a {
  text-decoration: none;
}
</style>
