import Vue from 'vue'
import Vuex from 'vuex'
import sys from './system'
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    sys
  }
})

export default store
