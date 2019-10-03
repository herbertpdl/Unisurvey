import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login'
import Home from '../pages/home/Home'
import RegisterUser from '../pages/users/RegisterUser'
import UsersList from '../pages/users/UsersList'
import RegisterMatter from '../pages/matters/RegisterMatter'
import RegisterCourse from '../pages/courses/RegisterCourse'

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
    }
  ]
})

export default router
