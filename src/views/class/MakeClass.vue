<template>
  <div id="make-class">
    <main-navbar /> 
    <b-container class="mt-5">
      <b-row>
        <b-col cols="6">
          <div class="div1">
            <label for="inputLive" class="mt-3">수업 제목</label>
            <b-form-input
                  @keyup="test(event)"
                  class="mt-3"
                  type="text"
                  placeholder="Text input"></b-form-input>
            <b-list-group class="mt-4">
              <b-list-group-item>파일명</b-list-group-item>
              <b-list-group-item>파일명</b-list-group-item>
              <b-list-group-item>파일명</b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
        <b-col>
          <label for="inputLive">자료 가져오기</label>
          <div class="div2">
            <b-button style="min-width:100px; background-color:#BDBDBD; border:none; border-radius:0" v-for="(item, i) in items" :key="i" >{{item}}</b-button>
            <div style="height:100%; width:100%; border:1px solid #000"></div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";
import FileList from "@/components/FileList";
export default {
  name: "make-class",
  data() {
    return {
      items: ["PC 자료", "웹 주소", "FLSS 검색", "내 즐겨찾기"]
    };
  },
  components: {
    MainNavbar,
    FileList
  },
  methods: {
    test(event) {
      this.innerHTML = event.keyCode;
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
}
.div1 {
  height: 70vh; /* Minimum height for IE */
  position: absolute;
  overflow: hidden;
  padding: 10px 20px;
  background-color: #bdd7ee;
}
.div2 {
  height: 66vh;
  position: absolute;
  overflow: hidden;
  padding: 10px 20px;
}
</style>
