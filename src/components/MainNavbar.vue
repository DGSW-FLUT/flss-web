<template>
  <div class="main-navbar">
    <b-navbar toggleable type="light" variant="light">
      <b-container>
        <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
        <router-link to="/"><b-navbar-brand>FLSS</b-navbar-brand></router-link>
        <b-collapse is-nav id="nav_text_collapse">
          <b-navbar-nav>
            <div v-for="(menu, i) in menus" :key="i">
              <router-link :to="menu.link">
                <b-nav-item class="m-2">
                  <b-nav-text>{{menu.text}}</b-nav-text>
                </b-nav-item>
              </router-link>
            </div>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item disabled class="mr-3">민경빈 선생님</b-nav-item>
            <b-nav-form>
              <b-button variant="danger" @click="logout()">Log out</b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "main-navbar",
  props: ["menus"],
  methods: {
    logout() {
      this.$vuevent.emit("logout");
    }
  }
};
</script>

<style lang="scss">
</style>
