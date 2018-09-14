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
                <b-nav-item>
                  <b-nav-text>{{menu.text}}</b-nav-text>
                </b-nav-item>
              </router-link>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "main-navbar",
  props: ["menus"]
};
</script>

<style lang="scss">
</style>
