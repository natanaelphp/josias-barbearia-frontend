import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import plugins from './plugins'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules, getters, plugins
})

export default store;