require('./bootstrap/bootstrap')
require('./plugins/plugins')
import Vue from 'vue'
import router from './routes/router'
import BaseTemplate from "./layout/BaseTemplate";
import store from './store/vuex'

Vue.config.productionTip = false

/**
 * Global Components
 */
Vue.component('preloader-component', () => import('./components/Preloader'))

new Vue({
  render: h => h(BaseTemplate),
  router,
  store
}).$mount('#app')

//Keep vuex with all values even reloading the page
store.dispatch('getMe')