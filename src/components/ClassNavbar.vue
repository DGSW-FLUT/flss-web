<template>
  <div class="class-navbar">
    <b-navbar toggleable type="light" variant="light">
      <b-container>
        <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_text_collapse">
          <b-nav class="w-100" justified>
            <b-container>
              <b-row>
                <b-col  v-for="(menu, i) in menus" :key="i">
                    <b-nav-item>
                      <router-link :to="menu.link">
                        <b-nav-text>{{menu.text}}</b-nav-text>
                    </router-link>
                  </b-nav-item>
                </b-col>
              </b-row>
            </b-container>
          </b-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "class-navbar",
  props: ["menus"]
};
</script>

<style lang="scss">
</style>
