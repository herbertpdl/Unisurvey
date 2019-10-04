import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store'
import './plugins/buefy'
import './plugins/multiselect'
import './plugins/vue-the-mask'

import '@mdi/font/css/materialdesignicons.min.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
