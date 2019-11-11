import Vue from 'vue'
import Router from 'vue-router'
import store from '../store' 

// System pages
import Login from '../pages/Login'
import Home from '../pages/home/Home'
// User 
import RegisterUser from '../pages/users/RegisterUser'
import UsersList from '../pages/users/UsersList'
import ViewUser from '../pages/users/ViewUser'
// Matter
import RegisterMatter from '../pages/matters/RegisterMatter'
import MattersList from '../pages/matters/MattersList'
import ViewMatter from '../pages/matters/ViewMatter'
// Course
import RegisterCourse from '../pages/courses/RegisterCourse'
import CoursesList from '../pages/courses/CoursesList'
import ViewCourse from '../pages/courses/ViewCourse'
// Question
import RegisterQuestion from '../pages/questions/RegisterQuestion'
import QuestionList from '../pages/questions/QuestionsList'
import ViewQuestion from '../pages/questions/ViewQuestion'
// Survey
import RegisterSurvey from '../pages/surveys/RegisterSurvey'
import AnswerSurvey from '../pages/surveys/AnswerSurvey'
//  Report
import GetReport from '../pages/getReport'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
        authorize: ['admin', 'aluno', 'professor', 'funcionario'],
      }
    },
    {
      path: '/register-user',
      name: 'register-user',
      component: RegisterUser,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
    {
      path: '/user/:id/:viewtype',
      name: 'view-user',
      component: ViewUser,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
    {
      path: '/user-list',
      name: 'user-list',
      component: UsersList,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
    {
      path: '/register-matter',
      name: 'register-matter',
      component: RegisterMatter,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
    {
      path: '/matter/:id/:viewtype',
      name: 'view-matter',
      component: ViewMatter,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
    {
      path: '/matters-list',
      name: 'matters-list',
      component: MattersList,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
    {
      path: '/register-course',
      name: 'register-course',
      component: RegisterCourse,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
    {
      path: '/course/:id/:viewtype',
      name: 'view-course',
      component: ViewCourse,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
    {
      path: '/courses-list',
      name: 'courses-list',
      component: CoursesList,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },  
    {
      path: '/register-question',
      name: 'register-question',
      component: RegisterQuestion,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
    {
      path: '/question-list',
      name: 'question-list',
      component: QuestionList,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
    {
      path: '/question/:id/:viewtype',
      name: 'view-question',
      component: ViewQuestion,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
    {
      path: '/register-survey',
      name: 'register-survey',
      component: RegisterSurvey,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
    {
      path: '/answer-survey/:idsurvey',
      name: 'answer-survey',
      component: AnswerSurvey,
      meta: {
        requiresAuth: true,
        authorize: ['aluno', 'professor', 'funcionario'],
      }
    },
    {
      path: '/get-report',
      name: 'get-report',
      component: GetReport,
      meta: {
        requiresAuth: true,
        authorize: 'admin',
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta
  let currentUserType = localStorage.getItem('userType')

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn && authorize.includes(currentUserType)) {
      next()
      return
    }
    next('/home') 
  } else {
    next() 
  }
})

export default router
