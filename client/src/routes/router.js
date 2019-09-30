import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login'
import Home from '../pages/Home'
import RegisterUser from '../pages/RegisterUser'

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
      path: '/register-users',
      name: 'register-users',
      component: RegisterUser, 
    }
  ]
})

export default router
