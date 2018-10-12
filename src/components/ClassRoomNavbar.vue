<template>
  <div class="classroom-navbar">
  <b-nav style="background-color:#F2F2F2;" justified>
    <b-container>
      <b-row>
        <b-col  v-for="(nav, i) in navs" :key="i">
          <b-nav-item>
            <router-link :to="nav.link">
              <b-nav-text>{{nav.text}}</b-nav-text>
            </router-link>
          </b-nav-item>
        </b-col>
      </b-row>
    </b-container>
  </b-nav>

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
