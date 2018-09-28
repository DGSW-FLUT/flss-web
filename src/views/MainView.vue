<template>
  <div id="main-view">
    <main-navbar :menus="menus" class="border-bottom shadow-sm" />
    <router-view />
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";

export default {
  name: "main-view",
  components: {
    MainNavbar
  },
  data() {
    return {
      menus: [
        {
          link: "/",
          text: "메뉴 1"
        }
      ]
    };
  },
  created() {
    this.$vuevent.on("logout", () => {
      this.logout();
    });
  },
  methods: {
    logout() {
      this.$store.commit("setAuthenticated", false);
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
