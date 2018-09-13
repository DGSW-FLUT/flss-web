<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="logout()">Logout</button>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.commit("setAuthenticated", false);
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
