import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './components/Home.vue';
import QuestionDetail from './components/Question/QuestionDetail';
import ErrorComponent from './components/ErrorComponent.vue';
import Question from './components/Question/Question.vue';
import Group from './components/Group/Group.vue'
import QuestionBank from './components/QuestionBank/QuestionBank.vue';
import Exam from './components/Exam/Exam.vue';
import Findexam from './components/Findexam/Findexam';


const routes = [
    { path : '/index' , component : Home ,meta:{title : 'XES Examination System'}},
    { path : '/question/:questionid' , component : QuestionDetail },
    { path : '/question', component : Question },
    { path : '/group' , component : Group },
    { path : '/questionbank' , component : QuestionBank },
    { path : '/exam' , component : Exam },
    { path : '/findexam' , component: Findexam },
    { path : '/' , redirect : '/index' },
    { path : '*' , component : ErrorComponent },
];

const router = new VueRouter({
  routes
});

export default router;