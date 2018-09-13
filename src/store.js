import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authenticated: false
  },
  getters: {
    isAuthenticated(state) {
      return !!state.authenticated;
    }
  },
  mutations: {
    setAuthenticated(state, payload) {
      return (state.authenticated = payload);
    }
  },
  actions: {}
});

export default store;
