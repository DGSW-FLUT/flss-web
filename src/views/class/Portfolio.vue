<template>
    <div id="portfolio">
        <b-container>
            <h3 class="mt-5 mb-5">포트폴리오 만들기</h3>
            <b-input-group class="col-md-5">
                <b-form-input placeholder="Enter search student"></b-form-input>
                <b-button slot="append" variant="success">검색</b-button>
            </b-input-group>
            
        </b-container>
    </div>
</template>

<script>
export default {
    name: "portfolio",
    data() {
        return {
            portfolios: []
        }
    },
    created() {
        this.$vuevent.on("add", idx => {
            this.portfolios[idx].selected = !this.portfolios[idx].selected;
        });
    }
}
</script>

<style lang="scss">

</style>
