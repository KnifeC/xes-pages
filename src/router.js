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
import Teacher from './components/Teacher/Teacher.vue';
import Admin from './components/Admin/Admin.vue';
import PersonalBank from './components/QuestionBank/PersonalBank.vue';
import SearchBank from './components/QuestionBank/SearchBank.vue';
import NewQuestionBank from './components/QuestionBank/NewQuestionBank.vue';
// import QuestionBankDetail from './components/QuestionBank/QuestionDetail.vue';


const routes = [
  { path: '/index', component: Home, meta: { title: 'XES Examination System' } },
  { path: '/question/:questionid', component: QuestionDetail, meta: { title: '题目详情' } },
  { path: '/question', component: Question, meta: { title: '题目' } , },
  { path: '/group', component: Group, meta: { title: '小组' } },
  // { path: '/questionbank/detail/:questionBankId', component: QuestionBankDetail , meta:{title:'题库详情'}},
  {
    path: '/questionbank',
    component: QuestionBank,
    children: [
      { path: 'search', component: SearchBank, meta: { title: '搜索题库' } },
      { path: 'new', component: NewQuestionBank, meta: { title: '新建题库' } },
      { path: ':userId', component: PersonalBank, meta: { title: '个人题库' } },
    ]
  },
  { path: '/exam', component: Exam, meta: { title: '考试' } },
  { path: '/teacher', component: Teacher, meta: { title: '教师面板' } },
  { path: '/admin', component: Admin, meta: { title: '管理员面板' } },
  { path: '/', redirect: '/index' },
  { path: '*', component: ErrorComponent },
];

const router = new VueRouter({
  routes
});

export default router;