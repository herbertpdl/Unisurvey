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
      componen: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register-user',
      name: 'register-user',
      component: RegisterUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/:id/:viewtype',
      name: 'view-user',
      component: ViewUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user-list',
      name: 'user-list',
      component: UsersList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register-matter',
      name: 'register-matter',
      component: RegisterMatter,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/matter/:id/:viewtype',
      name: 'view-matter',
      component: ViewMatter,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/matters-list',
      name: 'matters-list',
      component: MattersList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register-course',
      name: 'register-course',
      component: RegisterCourse,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/course/:id/:viewtype',
      name: 'view-course',
      component: ViewCourse,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/courses-list',
      name: 'courses-list',
      component: CoursesList,
      meta: {
        requiresAuth: true
      }
    },  
    {
      path: '/register-question',
      name: 'register-question',
      component: RegisterQuestion,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/question-list',
      name: 'question-list',
      component: QuestionList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/question/:id/:viewtype',
      name: 'view-question',
      component: ViewQuestion,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register-survey',
      name: 'register-survey',
      component: RegisterSurvey,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/answer-survey',
      name: 'answer-survey',
      component: AnswerSurvey,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/get-report',
      name: 'get-report',
      component: GetReport,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router
