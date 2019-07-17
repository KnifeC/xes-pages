import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import global_ from './global.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router.js';




Vue.use(ElementUI);
Vue.use(VueAxios, axios);

// axios.defaults.baseURL = global_.BASE_REQUEST_URL;
axios.defaults.crossDomain = true;
axios.defaults.withCredentials  = true;
Vue.config.productionTip = false;
Vue.prototype.GLOBAL = global_;



new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
