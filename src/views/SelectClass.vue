<template>
  <div id="select-class">
    <div class="mt-5"></div>
    <b-container>
      <div class="d-inline">가입한 학급 <span class="classroom-number">{{ classes.length }}</span></div>
      <b-row class="mt-4" align-v="center">
        <create-classroom-item class="col-md-3 col-sm-4 mb-4" />
        <classroom-item class="col-md-3 col-sm-4 mb-4" v-for="(classlist, i) in classes" :key="i" :classlist="classlist" /> <!-- classroom -> class -->

        <b-modal id="modalPrevent" ref="modal" @ok="okCreateClassroom" @shown="clearNewClassroom" title="새 학급 만들기">
          <b-form @submit.stop.prevent="submitCreateClassroom">
            <b-form-group label="학급 이름: " label-for="newClassroomName" :state="nameState" :invalid-feedback="invalidName">
              <b-form-input id="newClassroomName" v-model.trim="newClassroom.name" type="text" placeholder="이름" :state="nameState" />
            </b-form-group>
            <b-form-group label="이미지: " label-for="newClassroomImage" accept="image/*">
              <b-form-file id="newClassroomImage" v-model="newClassroom.image" placeholder="파일 선택.." />
            </b-form-group>
            <b-form-group label="설명: " label-for="newClassroomDesc" :state="descState" :invalid-feedback="invalidDesc">
              <b-form-textarea id="desc" v-model="newClassroom.desc" placeholder="설명" :rows="3" :max-rows="9" :no-resize="true" :state="descState"
              />
            </b-form-group>
          </b-form>
        </b-modal>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CreateClassroomItem from "@/components/CreateClassroomItem";
import ClassroomItem from "@/components/ClassroomItem";

export default {
  name: "select-class",
  components: {
    CreateClassroomItem,
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
      classes: [],
      newClassroom: {}
    };
  },
  created() {
    this.$http
      .get(
        `http://flss.kr/api/class/joined?uid=${this.$store.getters.getUserInfo.id}&token=${this.$store.getters.getToken}`
      )
      .then(res => {
        this.$store.commit('setClass', res.data)
        console.log("클래스 : " + this.$store.getters.getClass)
        this.classes = this.$store.getters.getClass
        
        console.log("클래스 목록 : " + this.classes)
      })
      .catch(err => {
        console.log(err);
      });

    this.classrooms.forEach(classroom => {
      if (classroom.name.length >= 12) {
        classroom.showName = classroom.name.slice(0, 8) + "...";
      } else {
        classroom.showName = classroom.name;
      }
    });
  },
  computed: {
    nameState() {
      return this.newClassroom.name && this.newClassroom.name.length >= 4
        ? true
        : false;
    },
    descState() {
      return this.newClassroom.desc ? true : false;
    },
    invalidName() {
      if (!this.newClassroom.name) {
        return "이름을 입력해 주세요.";
      }

      if (this.newClassroom.name.length > 4) {
        return "";
      } else if (this.newClassroom.name.length > 0) {
        return "이름은 최소 4글자 이상이어야 합니다.";
      }
    },
    invalidDesc() {
      if (!this.newClassroom.desc) {
        return "설명을 입력해 주세요.";
      } else {
        return "";
      }
    }
  },
  methods: {
    okCreateClassroom(evt) {
      evt.preventDefault();

      if (this.nameState && this.descState) {
        this.submitCreateClassroom();
        return;
      }
      alert("올바른 형식으로 작성해주세요.");
    },
    submitCreateClassroom() {
      alert("생성되었습니다");
      this.$refs.modal.hide();
    },
    clearNewClassroom() {
      this.newClassroom = {};
    }
  }
};
</script>

<style lang="scss">
.classroom-number {
  font-weight: bold;
  font-size: 15px;
}
</style>
