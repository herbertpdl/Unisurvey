import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login'
import Home from '../pages/home/Home'
import RegisterUser from '../pages/users/RegisterUser'
import UsersList from '../pages/users/UsersList'
import ViewUser from '../pages/users/ViewUser'
import RegisterMatter from '../pages/matters/RegisterMatter'
import RegisterCourse from '../pages/courses/RegisterCourse'
import RegisterQuestion from '../pages/questions/RegisterQuestion'
import QuestionList from '../pages/questions/QuestionsList'
import ViewQuestion from '../pages/questions/ViewQuestion'

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
    },
    {
      path: '/register-user',
      name: 'register-user',
      component: RegisterUser, 
    },
    {
      path: '/user/:id/:viewtype',
      name: 'view-user',
      component: ViewUser,
    },
    {
      path: '/user-list',
      name: 'user-list',
      component: UsersList, 
    },
    {
      path: '/register-matter',
      name: 'register-matter',
      component: RegisterMatter, 
    },
    {
      path: '/register-course',
      name: 'register-course',
      component: RegisterCourse, 
    },
    {
      path: '/register-question',
      name: 'register-question',
      component: RegisterQuestion, 
    },
    {
      path: '/question-list',
      name: 'question-list',
      component: QuestionList, 
    },
    {
      path: '/question/:id/:viewtype',
      name: 'view-question',
      component: ViewQuestion,
    },
  ]
})

export default router
