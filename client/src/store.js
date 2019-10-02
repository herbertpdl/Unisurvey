import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
  },
  getters: {
    loading(state) {
      return state.loading;
    },
  },
  mutations: {
    loading(state, status) {
      state.loading = status;
    },
  },
  actions: {

  },
})
