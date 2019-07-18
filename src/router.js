import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './components/Home.vue';
import QuestionDetail from './components/Question/QuestionDetail';
import ErrorComponent from './components/ErrorComponent.vue';
import Question from './components/Question/Question.vue';
import Group from './components/Group/Group.vue'

const routes = [
    { path : '/index' , component : Home },
    { path : '/question/:questionid' , component : QuestionDetail },
    { path : '/question', component : Question },
    { path : '/group' , component : Group },
    { path : '/' , redirect : '/index' },
    { path : '*' , component : ErrorComponent },
];

const router = new VueRouter({
  routes
});

export default router;