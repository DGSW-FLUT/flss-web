<script>
export default {
  name: "classting-handler",
  render: h => h(),
  async created() {
    let hashString = location.hash.split("#")[1];
    hashString = hashString.split("&access_token=")[1];
    hashString = hashString.split("&")[0];
    this.$http
      .get(`http://flss.kr/api/auth/userinfo?token=${hashString}`)
      .then(res => {
        this.$store.commit("setToken", hashString);
        this.$http
          .get(
            `http://flss.kr/api/auth/userinfo?token=${
              this.$store.getters.getToken
            }`
          )
          .then(res => {
            console.log(res);
            this.$store.commit("setUserInfo", res.data);
            this.$router.push({ path: "./" });
          });
      });
  }
};
</script>
