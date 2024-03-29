import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './components/Home.vue';
import QuestionDetail from './components/Question/QuestionDetail';
import ErrorComponent from './components/ErrorComponent.vue';
import Question from './components/Question/Question.vue';
import AddQuestion from './components/Question/AddQuestion.vue';
import Group from './components/Group/Group.vue'
import QuestionBank from './components/QuestionBank/QuestionBank.vue';
import Exam from './components/Exam/Exam.vue';
import NewExam from './components/Teacher/NewExam.vue';
import ReviewExam from './components/Teacher/ReviewExam.vue';
import Admin from './components/Admin/Admin.vue';
import ExamDetail from './components/Exam/ExamDetail.vue';
import TeacherExamdetail from './components/Exam/TeacherExamdetail'
import Addstudent from './components/Exam/Addstudent'
import UserInfo from './components/UserInfo.vue'
import PersonalBank from './components/QuestionBank/PersonalBank.vue';
import SearchBank from './components/QuestionBank/SearchBank.vue';
import NewQuestionBank from './components/QuestionBank/NewQuestionBank.vue';
import QuestionBankDetail from './components/QuestionBank/QuestionBankDetail.vue';
import MyQuestion from './components/Question/MyQuestion.vue';

const routes = [
  { path: '/index', component: Home, meta: { title: 'XES Examination System' } },
  { path: '/question/:questionid', component: QuestionDetail, meta: { title: '题目详情' } },
  { path: '/question', component: Question, meta: { title: '题目' }, },
  { path: '/addquestion', component: AddQuestion, meta: { title: '增加题目' }, },
  { path: '/myquestion', component: MyQuestion, meta: { title: '我的题目' }, },
  { path: '/group', component: Group, meta: { title: '小组' } },
  { path: '/questionbank/detail/:questionBankId', component: QuestionBankDetail, meta: { title: '题库详情' } },
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
  { path: '/newexam', component: NewExam, meta: { title: '发起考试' } },
  { path: '/reviewexam', component: ReviewExam, meta: { title: '批阅考试' } },
  { path: '/admin', component: Admin, meta: { title: '管理员面板' } },
  { path: '/examdetail/:id', component: ExamDetail },
  { path: '/teacherexamdetail', component: TeacherExamdetail },
  { path: '/addstudent', component: Addstudent },
  { path: '/userinfo', component: UserInfo },



  { path: '/', redirect: '/index' },
  { path: '*', component: ErrorComponent },

];

const router = new VueRouter({
  routes
});

export default router;