<template>
  <div id="class-list">
    <b-container>
      <b-row>
        <b-table class="mt-4" hover :items="items" @row-clicked="clickevent">
        </b-table>
        <!-- <b-card tag="article"
                style="max-width: 20rem;"
                class="mb-2">
          <p class="card-text">
            Title : 123
          </p>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card> -->
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
export default {
  name: "class-list",
  data() {
    return {
      items: [
        {
          제목: "시 짓기",
          학년: "1학년",
          과목: "국어",
          날짜: "2018-07-12:01:30:12"
        },
        {
          제목: "동사와 명사",
          학년: "2학년",
          과목: "영어",
          날짜: "2018-07-12:01:30:12"
        },
        {
          제목: "곱셈과 나눗셈",
          학년: "5학년",
          과목: "수학",
          날짜: "2018-07-12:01:30:12"
        },
        {
          제목: "여러가지 원소들",
          학년: "6학년",
          과목: "과학",
          날짜: "2018-07-12:01:30:12"
        }
      ]
    };
  },
  methods: {
    clickevent(record, index) {
      console.log(record.제목);
      this.$vuevent.$emit("test", "hello");
      this.$router.push({ path: "./lesson" });
    }
  }
};
</script>

<style>
</style>
