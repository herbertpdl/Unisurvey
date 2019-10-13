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
    auth_success(state, token, user) {
      state.user =  user
      state.token = token
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
            const user = resp.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('auth_success', token, user)
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
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
  },
})
