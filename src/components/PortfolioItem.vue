<template>
    <div class="portfolio-item">
        <b-card 
            class="mb-4 unselected"
            :class="{ selected: select }"
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
            <b-card-footer>{{ portfolio.UploadTime }}</b-card-footer>

        </b-card>
    </div>
</template>

<script>
export default {
  name: "portfolio-item",
  data(){
    return{
      select : false
    }
  },
  props: ["portfolio", "i"],
  methods: {
    add(i) {
      this.select = this.portfolio.selected;
      this.$vuevent.$emit("idx", i);
      console.log(i+ " : " + this.portfolio.selected);
    }
  }
};
</script>

<style lang="scss">
.unselected{
  opacity : 0.5;
}

.selected {
  opacity : 1.0;
}

.portfolio-item {
  cursor: pointer;
}
</style>
