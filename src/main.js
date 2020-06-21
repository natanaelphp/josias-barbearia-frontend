import Vue from 'vue'
import App from '@/components/layout/App.vue'
import router from './router'
import store from './store'

import { sync } from 'vuex-router-sync'

import Buefy from 'buefy'
import BuefyConfig from './BuefyConfig'

Vue.use(Buefy, BuefyConfig)

sync(store, router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
