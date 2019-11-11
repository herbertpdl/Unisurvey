import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { login } from '@/services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    user: null,
    token: localStorage.getItem('token') || null,
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    isLoggedIn(state) {
      return !!state.token
    }
  },
  mutations: {
    loading(state, status) {
      state.loading = status;
    },
    auth_success(state, data) {
      state.user = data.user
      state.token = data.token
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        login(user)
          .then(resp => {
            const token = resp.token
            localStorage.setItem('token', token)
            localStorage.setItem('userType', resp.user.type)
            localStorage.setItem('userCourse', resp.user.course)
            localStorage.setItem('userName', resp.user.name)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('auth_success', resp)
            resolve(resp)
          })
          .catch(err => {
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('userType')
        localStorage.removeItem('userCourse')
        localStorage.removeItem('userName')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
  },
})
