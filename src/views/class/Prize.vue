<template>
  <div id="member-list">
    <member-list class="mt-5" :memberlist="memberlist" />
    <b-container>
      <b-row>
        <b-col cols="2" offset="10">
          <b-button class="btn-block" @click="test()">상점주기</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";
import MemberList from "@/components/MemberList";
export default {
  name: "prize",
  created() {
    this.$vuevent.on("idx", idx => {
      this.memberlist[idx].selected = !this.memberlist[idx].selected;
    });
  },
  data() {
    return {
      memberlist: [
        {
          name: "User1",
          selected: false
        },
        {
          name: "User2",
          selected: false
        },
        {
          name: "User3",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        },
        {
          name: "User4",
          selected: false
        }
      ]
    };
  },
  components: {
    MainNavbar,
    MemberList
  },
  methods: {
    test() {
      for (let i = 0; i < this.memberlist.length; i++) {
        this.memberlist[i].selected = false;
      }
    }
  }
};
</script>

<style>
</style>
