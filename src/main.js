import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Axios from "axios";
import Vuevent from "vuevent";
import BootstrapVue from "bootstrap-vue";
import VueMoment from "vue-moment";
import VueCharts from "vue-chartjs";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "expose-loader?$!expose-loader?jQuery!jquery";

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;
Vue.prototype.$chart = VueCharts;

library.add(fas);

Vue.use(Vuevent);
Vue.use(BootstrapVue);
Vue.use(VueMoment);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
