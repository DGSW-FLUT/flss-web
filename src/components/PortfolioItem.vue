<template>
    <div class="portfolio-item">
        <b-card 
            no-body 
            @click="add(i)"
            :class="{selected: portfolio.selected}">
            <h4 slot="header">{{ portfolio.Title }}</h4>
            <div class="border-bottom">
                <font-awesome-icon class="py-2" fas icon="paperclip" size="2x" />
                {{ portfolio.File }}
            </div>
            <b-card-body>
            <p class="card-text">
                <pre>{{ portfolio.Content}}</pre>
            </p>
            </b-card-body>
            <b-card-footer>{{ portfolio.AddTime }}</b-card-footer>
        </b-card>
    </div>
</template>

<script>
export default {
  name: "portfolio-item",
  props: ["portfolio", "i"],
  methods: {
    add(i) {
      this.$vuevent.$emit("idx", i);
      console.log(this.portfolio.selected);
    }
  }
};
</script>

<style lang="scss">
.selected {
  border: 1px solid red;
}
</style>
