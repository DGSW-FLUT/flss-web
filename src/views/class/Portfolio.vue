<template>
    <div id="portfolio">
        <b-container>
            <h3 class="mt-5 mb-5">포트폴리오 만들기</h3>
            <b-input-group class="col-md-5 mb-5">
                <b-form-input placeholder="Enter search student" v-model="studentName"></b-form-input>
                <b-button slot="append" variant="success" @click="search">검색</b-button>
            </b-input-group>
            <h1 class="mt-5 mb-5" v-if="portfolios.length === 0">글이 존재하지 않습니다</h1>
            <portfolio-item v-for="(portfolio,i) in portfolios" :key="i" :portfolio="portfolio" :i="i"></portfolio-item>
        </b-container>
    </div>
</template>

<script>
import PortfolioItem from "@/components/PortfolioItem";

export default {
  name: "portfolio",
  data() {
    return {
      portfolios: [],
      selected: [],
      studentName: ''
    };
  },
  methods: {
    search() {
      this.selected = [];
      this.$http.get('http://flss.kr/api/data/getPostByName?cid='+this.$store.getters.getThisClass.cid+'&name='+this.studentName)
      .then(res => {
        this.portfolios = res.data;
      })
      .catch(err => {
        this.portfolios = [];
        console.log(err.message);
      })
    }
  },
  created() {
    this.$vuevent.on("idx", idx => {
      if (this.portfolios[idx].selected) {
        this.selected.forEach((el, i) => {
          // console.log("el : "+el + " portfolio[idx] : ")
          if (el === this.portfolios[idx]) {
            this.selected.splice(i, 1);
          }
        });
      } else {
        this.selected.push(this.portfolios[idx]);
      }
      this.portfolios[idx].selected = !this.portfolios[idx].selected;
    });
  },
  components: {
    PortfolioItem
  }
};
</script>

<style lang="scss">
</style>
