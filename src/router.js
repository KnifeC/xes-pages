import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './components/Home.vue';
import QuestionDetail from './components/QuestionDetail';
import ErrorComponent from './components/ErrorComponent.vue';
import Question from './components/Question.vue';


const routes = [
    { path : '/index' , component : Home },
    { path : '/question/:questionid' , component : QuestionDetail},
    { path : '/question', component : Question},

    { path : '/' , redirect : '/index'},
    { path : '*' , component : ErrorComponent }
];

const router = new VueRouter({
  routes
});

export default router;