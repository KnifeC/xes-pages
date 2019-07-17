import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './components/Home.vue';
const routes = [
  { path:'/index' , component:Home },
  { path:'' , redirect:'/index'},

];

const router = new VueRouter({
  routes
});

export default router;