import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import body from '@/components/mainframe'
import error from '@/components/404.vue'
import ElementUI from 'element-ui'
import '~/css/elementui.css'
//import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'body',
    component: body
  }, {
    path: "/login",
    name: "login",
    component: login
  }, {
    path: '/test111',
    name: "bodytest",
    component: body
  }, {
    path: "*",
    name: "error",
    component: error
  }]
})
