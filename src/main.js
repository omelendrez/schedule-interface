import Vue from 'vue'
import App from './App'
import router from './router/router'
import BootstrapVue from 'bootstrap-vue'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, { adapter: Chart })
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data() {
    return {}
  },
  render: h => h(App)
})
