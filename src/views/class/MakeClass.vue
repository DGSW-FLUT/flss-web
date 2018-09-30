<template>
  <div id="make-class">
      <b-container class="mt-5">
      <b-row>
        <b-col cols="6">
          <div class="div1 border no-scrollbar">
            <label for="inputLive" class="mt-3">수업 제목</label>
            <b-form-input
                  @keyup="test(event)"
                  class="mt-3"
                  type="text"
                  placeholder="Text input"></b-form-input>
            <b-list-group>
              <b-list-group-item class="flex-column align-items-start mt-3" v-for="(file, i) in files" :key="i">
                <p class="mb-1">
                  {{ file.fileName }}
                </p>
                <small>{{ file.date }}</small>
              </b-list-group-item>
            </b-list-group>
<!--                   
            <b-list-group class="mt-4">
              <b-list-group-item class="mb-3" v-for="(file, i) in files" :key="i"> 
                <p> {{ file.자료명 }} </p>  
                <p class="mtm-5"> {{ file.날짜 }} </p>
              </b-list-group-item>
              <b-list-group-item>파일명</b-list-group-item>
              <b-list-group-item>파일명</b-list-group-item>
            </b-list-group> -->
          </div>
        </b-col>
        <b-col>
          <label for="inputLive">자료 가져오기</label>
            <b-card>
              <b-container>
                <b-row class="p-2" style="font-weight:bold">
                  <b-col>자료명</b-col>
                  <b-col>날짜</b-col>
                </b-row>
                <b-row class="border-top tableItem p-2" style="cursor:pointer" v-for="(item, i) in items" :key="i" @click="addFile(i)">
                  <b-col>
                    {{ item.fileName }}
                  </b-col>
                  <b-col>
                    {{ item.date }}
                  </b-col>
                </b-row>
              </b-container>
              <!-- <b-table style="cursor:pointer" hover :items="items" @click="addFile()"></b-table> -->
            </b-card>          
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";
import FileList from "@/components/FileList";
const items = [
  { fileName: "1.pptx", date: "2018-08-01" },
  { fileName: "2.pptx", date: "2018-08-02" },
  { fileName: "3.pptx", date: "2018-08-03" },
  { fileName: "4.pptx", date: "2018-08-04" }
];
export default {
  name: "make-class",
  data() {
    return {
      items: items,
      files: []
      //["PC 자료", "웹 주소", "FLSS 검색", "내 즐겨찾기"]
    };
  },
  components: {
    MainNavbar,
    FileList
  },
  methods: {
    addFile(i) {
      this.files.push(this.items[i]);
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
}
.div2 {
  height: 66vh;
  position: absolute;
  overflow: hidden;
  padding: 10px 20px;
}

.tableItem:hover {
  background-color: #f2f2f2;
}

.mtm-5 {
  margin-top: -14px;
}

.no-scrollbar {
  overflow-y: scroll;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
