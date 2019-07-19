import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import global_ from './global.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router.js';
import store from './vuex/store.js';



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
  store,
  render: h => h(App),
}).$mount('#app')

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})