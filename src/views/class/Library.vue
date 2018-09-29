<template>
  <div id="library">
    <b-container>
      <b-row class="mt-5">
        <b-col v-for="(file, i) in files" :key="i" cols="3">
          <b-card style="cursor:pointer"
                  :header="file.text"
                  :footer="file.date"
                  footer-tag="footer"
                  >
              <p class="card-text">(file image)</p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "library",
  data() {
    return {
      files: [
        {
          text: "제목1",
          date: "2018-08-01"
        },
        {
          text: "제목2",
          date: "2018-08-02"
        }
      ]
    };
  }
};
</script>

<style>
</style>
