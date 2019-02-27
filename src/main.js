import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import '@mdi/font/css/materialdesignicons.css'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('M/D/YYYY')
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
