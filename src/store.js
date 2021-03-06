import Vue from "vue";
import Vuex from "vuex";

import createPersistedstate from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authenticated: false,
    test: [],
    token: "",
    userinfo: {},
    class: [],
    thisClass: "",
    memberlist: [],
    lessonNum: "",
    lesson: [],
    quiz: [],
    type: "",
    thisLesson: ""
  },
  getters: {
    isAuthenticated(state) {
      return !!state.authenticated;
    },
    getToken(state) {
      return state.token.toString();
    },
    getUserInfo(state) {
      return state.userinfo;
    },
    getClass(state) {
      return state.class;
    },
    getThisClass(state) {
      return state.thisClass;
    },
    getMemberList(state) {
      return state.memberlist;
    },
    getLessonNum(state) {
      return state.lessonNum;
    },
    getLesson(state) {
      return state.lesson;
    },
    getQuiz(state) {
      return state.quiz;
    },
    getType(state) {
      return state.type;
    },
    getThisLesson(state) {
      return state.thisLesson;
    }
  },
  mutations: {
    setAuthenticated(state, payload) {
      return (state.authenticated = payload);
    },
    setToken(state, payload) {
      return (state.token = payload);
    },
    setUserInfo(state, payload) {
      return (state.userinfo = payload);
    },
    setClass(state, payload) {
      return (state.class = payload);
    },
    setThisClass(state, payload) {
      return (state.thisClass = payload);
    },
    setMemberList(state, payload) {
      return (state.memberlist = payload);
    },
    setLessonNum(state, payload) {
      return (state.lessonNum = payload);
    },
    setLesson(state, payload) {
      return (state.lesson = payload);
    },
    setType(state, payload) {
      return (state.type = payload);
    },
    setThisLesson(state, payload) {
      return (state.lesson = payload);
    },
    setTest(state, payload) {
      return (state.test = payload);
    },
    LogOut(state) {
      state.token = "";
      state.userinfo = "";
      state.class = "";
      state.thisClass = "";
      state.memberlist = "";
      state.lessonNum = "";
      state.lesson = "";
      state.type = "";
      state.lesson = "";
    }
  },
  actions: {},
  plugins: [createPersistedstate()]
});

export default store;
