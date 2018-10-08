<template>
    <div class="portfolio-item">
        <b-card 
            no-body 
            @click="add(i)"
            :class="{selected: portfolio.selected}">
            <h4 slot="header">{{ file.title }}</h4>
            <div class="border-bottom">
                <font-awesome-icon class="py-2" fas icon="paperclip" size="2x" />
                {{ file.fileName }}
            </div>
            <b-card-body>
            <p class="card-text">
                <pre>{{ file.article }}</pre>
            </p>
            </b-card-body>
            <b-card-footer>{{ file.date }}</b-card-footer>
        </b-card>
    </div>
</template>

<script>
export default {
    name: "portfolio-item",
    props: ["portfolio","i"],
    methods: {
        add(i) {
            console.log(i);
            this.$vuevent.$emit("idx", i);
        }
  }
}
</script>

<style lang="scss">
.selected {
  border: 1px solid red;
}
</style>
