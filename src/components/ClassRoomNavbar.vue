<template>
  <div class="classroom-navbar">
  <b-nav class="bg-light" justified>
    <b-container>
      <b-row>
        <b-col  v-for="(nav, i) in navs" :key="i">
          <b-nav-item>
              <b-nav-text>{{nav.text}}</b-nav-text>
          </b-nav-item>
        </b-col>
      </b-row>
    </b-container>
  </b-nav>

  <!--
    <b-navbar toggleable type="drak" variant="light">
      <b-container>
        <b-collapse is-nav id="nav_collapse" >
          <b-navbar-nav>
            <div v-for="(nav, i) in navs" :key="i">
              <b-nav-item>
                <b-nav-text>{{nav.text}}</b-nav-text>
              </b-nav-item>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar> -->

  </div>
</template>

<script>
export default {
  name: "main-navbar",
  props: ["navs"]
};
</script>

<style lang="scss">
</style>
