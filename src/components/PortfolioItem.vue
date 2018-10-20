<template>
    <div class="portfolio-item">
        <b-card 
            class="mb-4"
            :class="{selected : selected}"
            no-body 
            @click="add(i)">
            <h4 slot="header">{{ portfolio.Title }}</h4>
            <div class="border-bottom">
              <!-- data-html2canvas-ignore="true"로 하면 pdf로 변환시 해당 element는 보이지 않는다. 체크박스에 추가해주길 바람-->
              <font-awesome-icon class="py-2" fas icon="paperclip" size="2x" data-html2canvas-ignore="true" />
              {{ portfolio.Name }}
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
  data(){
    return{
      selected : ""
    }
  },
  methods: {
    add(i) {
      this.$vuevent.$emit("idx", i);
      this.selected = this.portfolio.selected;
      console.log(i+ " : " + this.portfolio.selected);
    }
  }
};
</script>

<style lang="scss">
.selected {
  border: 2px solid black;
}

.portfolio-item {
  cursor: pointer;
}
</style>
