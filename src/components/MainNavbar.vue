<template>
  <div class="main-navbar">
    <b-navbar toggleable type="light" variant="light">
      <b-container>
        <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
        <router-link to="/"><b-navbar-brand>FLSS</b-navbar-brand></router-link>
        <b-input-group size="sm" style="max-width: 200px">
          <b-form-input v-model="searchName" placeholder="검색"></b-form-input>
          <b-button slot="append" variant="success" @click="search">검색</b-button>
        </b-input-group>
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
            <b-nav-item @click="mypage()" class="mr-3">{{ userName + " " + role }}</b-nav-item>
            <b-nav-form>
              <b-button variant="danger" @click="logout()">로그아웃</b-button>
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
  data() {
    return {
      userName: "",
      role: "",
      searchName: ""
    };
  },
  created() {
    switch (this.$store.getters.getUserInfo.role) {
      case "student":
        this.role = "학생";
        break;
      case "teacher":
        this.role = "선생님";
        break;
    }
    this.userName = this.$store.getters.getUserInfo.name;
    console.log(this.userName);
    console.log(this.role);
  },
  mounted() {
    // 선택된 메뉴 하이라이트
    $(`a.nav-link>a[href='${location.pathname}']`)
      .closest("div.col")
      .css("background", "lightgray");
    $(`a.nav-link>a`).on("click", function(e) {
      $(`a.nav-link>a`)
        .closest("div.col")
        .css("background", "none");
      $(`a.nav-link>a[href='${this.getAttribute("href")}']`)
        .closest("div.col")
        .css("background", "lightgray");
    });
  },
  methods: {
    logout() {
      this.$store.commit("LogOut");
      this.$vuevent.emit("logout");
    },
    search() {
      this.$router.push({ path: `./search/${searchName}` });
    }
  }
};
</script>

<style lang="scss">
.navbar-text {
  word-break: keep-all;
}
</style>
