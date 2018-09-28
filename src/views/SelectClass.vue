<template>
  <div id="select-class">
    <div class="mt-5"></div>
    <b-container>
      <div class="d-inline">가입한 클래스룸 <span class="classroom-number">{{ classrooms.length }}</span></div>
      <b-row class="mt-4" align-v="center">
          <!-- <create-classroom-item /> -->
          <b-card
                  img-src="./../assets/plus.png"
                  tag="article"
                  class="mb-2">
            <b-button variant="primary" @click="goClassRoom()">둘러보기</b-button>
          </b-card>
          <classroom-item class="col-md-3 col-sm-4 mb-4" v-for="(classroom, i) in classrooms" :key="i" :classroom="classroom" />
          <b-col>
            <b-button class="col-md-1 ml-4 h-25 center" variant="success" v-b-modal.modalPrevent>+</b-button>
          </b-col>
          
          <b-modal id="modalPrevent"
             ref="modal"
             @ok="okCreateClassroom"
             @shown="clearNewClassroom"
             title="클래스룸 생성">
            <form @submit.stop.prevent="submitCreateClassroom">
              <b-col sm="5"><label :for="`name`">클래스룸 이름 :</label></b-col>
              <b-col sm="9"><b-form-input :id="newClassroom.name" type="text" placeholder="Enter Name" :state="nameState" v-model.trim="newClassroom.name"></b-form-input>
              <b-form-invalid-feedback>
                이름은 최소 4글자 이상이어야합니다
              </b-form-invalid-feedback>
              </b-col>
              <b-col sm="2"><label :for="`image`" accept="image/*">이미지 :</label></b-col>
              <b-col sm="9"><b-form-file v-model="newClassroom.image" placeholder="Choose a file..."></b-form-file></b-col>
              <b-col sm="2"><label :for="`desc`">설명 :</label></b-col>
              <b-col sm="9">
                <b-form-textarea
                      id="desc"
                      v-model="newClassroom.desc"
                      placeholder="Enter Desc"
                      :rows="3"
                      :max-rows="9"
                      :no-resize="true"
                      :state="descState">
                </b-form-textarea>
                <b-form-invalid-feedback>
                  설명은 공백일 수 없습니다
                </b-form-invalid-feedback>
              </b-col>
            </form>
          </b-modal>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ClassroomItem from "@/components/ClassroomItem"

export default {
  name: "select-class",
  components: {
    ClassroomItem
  },
  data() {
    return {
      classrooms: [
        {
          name: "북삼초 1학년 1반"
        },
        {
          name: "대구소프트웨어고등학교 탐구반"
        },
        {
          name: "FLUT"
        },
        {
          name: "DARKROOM"
        },
        {
          name: "클래스 5"
        },
        {
          name: "클래스 6"
        }
      ],
      newClassroom: {},
      image : "./../assets/plus.png"
   }
  },
  created() {
    this.classrooms.forEach(classroom => {
      if (classroom.name.length >= 12) {
        classroom.showName = classroom.name.slice(0, 9) + "..."
      } else {
        classroom.showName = classroom.name
      }
    })
  },
  computed: {
    nameState() {
      return this.newClassroom.name && this.newClassroom.name.length >= 4 ? true : false
    },
    descState() {
      return this.newClassroom.desc ? true : false
    }
  },
  methods: {
    okCreateClassroom(evt) {
      evt.preventDefault()

      if(this.nameState && this.descState) {
        this.submitCreateClassroom()
        return
      }
      alert("올바른 형식으로 작성해주세요")
    },
    submitCreateClassroom() {
      alert('생성되었습니다')
      this.$refs.modal.hide()
    },
    clearNewClassroom() {
      this.newClassroom = {}
    }
  }
}
</script>

<style lang="scss">
.classroom-number {
  font-weight: bold;
  font-size: 15px;
}
.center{
  position: relative;
  left: 50%;
  transform: translateX(-50%);

}

</style>
