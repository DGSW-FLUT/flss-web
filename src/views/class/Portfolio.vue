<template>
    <div id="portfolio">
        <b-container>
            <h3 class="mt-5 mb-5">포트폴리오 만들기</h3>
            <b-input-group class="col-md-5 mb-5">
                <b-form-input placeholder="Enter search student" v-model="studentName"></b-form-input>
                <b-button slot="append" variant="success" @click="search">검색</b-button>
            </b-input-group>
            <b-button style="float:right" v-if="portfolios.length" variant="primary">포트폴리오 만들기</b-button>
            <span class="aligncenter mt-5" v-if="!portfolios.length"> 
                <font-awesome-icon class="py-2 ml-5 mr-5 " fas icon="exclamation-circle" size="10x"/><br>
                <span style="font-size:2em">등록된 게시물이 없습니다.</span>
              </span>
            <div id="portfolioitems">
              <h3 class="mt-5 mb-5" v-if="portfolios.length">{{ studentName }} 포트폴리오</h3>
              <portfolio-item v-for="(portfolio,i) in portfolios" :key="i" :portfolio="portfolio" :i="i"></portfolio-item>
            </div>
        </b-container>
    </div>
</template>

<script>
import PortfolioItem from "@/components/PortfolioItem";
import html2canvas from "html2canvas";
// Use JSPDF
import jsPDF from 'jspdf'
export default {
  name: "portfolio",
  data() {
    return {
      portfolios: [],
      selected: [],
      studentName: ""
    };
  },
  methods: {
    search() {
      this.selected = [];
      this.$http
        .get(
          "http://flss.kr/api/data/getPostByName?cid=" +
            this.$store.getters.getThisClass.cid +
            "&name=" +
            this.studentName
        )
        .then(res => {
          this.portfolios = res.data;
          console.log(this.portfolios)
          if (this.portfolios.length) {
            /* 
              pdf로 변환 (실제에는 체크박스를 선택하여 변환 버튼을 누를 때 변환이 된다. 
              setTimeout은 vue 랜더링 시간 때문. 벼튼을 사용 할 시 setTimeout 삭제 바람)
            */
            setTimeout(() => {
              this.createPDF(this.portfolios)    
            }, 1000)
              
          }
        })
        .catch(err => {
          this.portfolios = [];
          console.log(err.message);
        });
    },
    createPDF(portfolio) {
      html2canvas(document.getElementById("portfolioitems"))
        .then(function (canvas) {
          var imgData = canvas.toDataURL('image/png');           
          var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
          var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;
          var doc = new jsPDF('p', 'mm');
          var position = 0;
          // 첫 페이지 출력
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          // 한 페이지 이상일 경우 루프 돌면서 출력
          while (heightLeft >= 20) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
          // 파일 저장
          doc.save('sample_A4.pdf');
        })
    }
  },
  created() {
    this.$vuevent.on("idx", idx => {
      if (this.portfolios[idx].selected) {
        this.selected.forEach((el, i) => {
          // console.log("el : "+el + " portfolio[idx] : ")
          if (el === this.portfolios[idx]) {
            this.selected.splice(i, 1);
          }
        });
      } else {
        this.selected.push(this.portfolios[idx]);
      }
      this.portfolios[idx].selected = !this.portfolios[idx].selected;
    });
  },
  components: {
    PortfolioItem
  }
};
</script>

<style lang="scss">
</style>
