<template>
  <div class="class-navbar">
    <b-navbar toggleable type="light" variant="light">
      <b-container>
        <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_text_collapse">
          <b-nav justified>
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
          <!-- <b-navbar-nav justified>
            <div v-for="(menu, i) in menus" :key="i">
              <router-link :to="menu.link">
                <b-nav-item class="mx-2" >
                  <b-nav-text>{{menu.text}}</b-nav-text>
                </b-nav-item>
              </router-link>
            </div>
          </b-navbar-nav> -->
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
