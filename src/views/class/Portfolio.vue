<template>
    <div id="portfolio">
        <b-container>
            <h3 class="mt-5 mb-5">포트폴리오 만들기</h3>
            <b-input-group class="col-md-5 mb-5">
                <b-form-input placeholder="찾을 학생 이름" v-model="studentName"></b-form-input>
                <b-button slot="append" variant="success" @click="search">검색</b-button>
            </b-input-group>
            <div v-if="portfolios.length">
              <b-row>
                <b-col lg="7">
                  포트폴리오 제목 <b-form-input class="mt-3" placeholder="포트폴리오 제목을 입력해주세요" v-model="portfolioTitle"></b-form-input> <br>
                  교사의견 <b-form-textarea
                            v-model="teacherOpinion"
                            class="mb-3 mt-3"
                            style="resize:none"
                            placeholder="교사 의견을 입력해주세요"
                            rows="3" />
                  <b-button style="float:right" variant="primary" @click="createPDF">포트폴리오 만들기</b-button>
                </b-col>
              </b-row>
            </div>
            <span class="aligncenter mt-5" v-if="!portfolios.length"> 
                <font-awesome-icon class="py-2 ml-5 mr-5 " fas icon="exclamation-circle" size="10x"/><br>
                <span style="font-size:2em">등록된 게시물이 없습니다.</span>
              </span>
            <div id="portfolioitems" style="padding-bottom:10px">
              <h3 class="mt-5 mb-5" v-if="portfolios.length">{{ portfolioTitle }}</h3>
              <portfolio-item v-for="(portfolio,i) in portfolios" :key="i" :portfolio="portfolio" :i="i"></portfolio-item>
              {{portfolios.length ? '교사의견' : ''}} <b-form-textarea
                            v-if="portfolios.length"
                            v-model="teacherOpinion"
                            class="mb-3 mt-3 opinion-readonly"
                            style="resize:none"
                            rows="3" readonly="readonly"/>
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
      selectedStudentName: "",
      studentName: "",
      teacherOpinion: "",
      portfolioTitle: ""
    };
  },
  computed: {
    isValidInput() {
      return this.portfolioTitle && this.teacherOpinion && (this.selected.length !== 0);
    }
  },
  methods: {
    search() {
      this.selected = [];
      this.selectedStudentName = this.studentName;
      this.$http
        .get(
          "http://flss.kr/api/data/getPostByName?cid=" +
            this.$store.getters.getThisClass.cid +
            "&name=" +
            this.studentName
        )
        .then(res => {
          this.portfolios = res.data;
          if (!this.portfolios.length)
            alert("해당 학생이 존재하지 않습니다.")
          this.portfolioTitle = this.studentName + '학생 포트폴리오'
        })
        .catch(err => {
          alert("해당 학생이 존재하지 않습니다.")
          this.portfolios = [];
          console.log(err.message);
        });
    },
    createPDF() {
      if(!this.isValidInput) {
        alert("입력하지 않은 부분이 있습니다. 확인해주세요");
        return;
      }
      html2canvas(document.getElementById("portfolioitems"))
        .then((canvas) => {
          var imgData = canvas.toDataURL('image/png');           
          var imgWidth = 190; // 이미지 가로 길이(mm) A4 기준 기본 210
          var pageHeight = 210 * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;
          var doc = new jsPDF('p', 'mm');
          var position = 0;
          // 첫 페이지 출력
          doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          // 한 페이지 이상일 경우 루프 돌면서 출력
          while (heightLeft >= 20) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
          // 파일 저장
          // doc.save(new Date().toJSON().split('T')[0] + '_' + this.studentName + '학생_포트폴리오' + '.pdf');
          doc.save(this.portfolioTitle + '.pdf');
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
.opinion-readonly{
  background-color: white !important;
}
</style>
