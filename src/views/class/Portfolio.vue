<template>
    <div id="portfolio">
        <b-container>
            <h3 class="mt-5 mb-5">포트폴리오 만들기</h3>
            <b-input-group class="col-md-5 mb-5">
                <b-form-input placeholder="Enter search student"></b-form-input>
                <b-button slot="append" variant="success">검색</b-button>
            </b-input-group>
            <portfolio-item v-for="(portfolio,i) in portfolios" :key="i" :portfolio="portfolio" :i="i"></portfolio-item>
        </b-container>
    </div>
</template>

<script>
import PortfolioItem from "@/components/PortfolioItem";

const portfolios = [
    {
        selected: false,
        writer: "박태형",
        file: {
            name: "portfolio",
            date: "2018-04-14"
        }
    }
]
export default {
    name: "portfolio",
    data() {
        return {
            portfolios,
            selected: []
        }
    },
    created() {
        this.$vuevent.on("idx", idx => {
            if(this.portfolio[idx].selected) {
                this.selected.forEach((el,i)  => {
                    if(el === portfolio[idx]) {
                        selected.splice(i,1);
                    }
                })
            }
            console.log("this.portfolios[idx].selected : "+this.portfolios[idx].selected);
            this.portfolios[idx].selected = !this.portfolios[idx].selected;
        });
    },
    components: {
        PortfolioItem
    }
}
</script>

<style lang="scss">

</style>
