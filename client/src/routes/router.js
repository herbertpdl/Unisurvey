import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login'
import Home from '../pages/Home'
import RegisterUser from '../pages/RegisterUser'
import RegisterMatter from '../pages/RegisterMatter'

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
      path: '/register-matter',
      name: 'register-matter',
      component: RegisterMatter, 
    }
  ]
})

export default router
