import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import global_ from './global.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';




Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
// axios.defaults.baseURL = global_.BASE_REQUEST_URL;
Vue.config.productionTip = false;
Vue.prototype.GLOBAL = global_;

new Vue({
  el: '#app',
  render: h => h(App),
}).$mount('#app')
