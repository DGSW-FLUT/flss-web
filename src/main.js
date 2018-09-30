import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Axios from "axios";
import Vuevent from "vuevent";
import BootstrapVue from "bootstrap-vue";
import VueMoment from "vue-moment";
import VueCharts from "vue-chartjs";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;
Vue.prototype.$chart = VueCharts;

Vue.use(Vuevent);
Vue.use(BootstrapVue);
Vue.use(VueMoment);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
