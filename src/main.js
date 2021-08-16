// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from "./store" //vuex
import DlgDraggable from "vue-element-dialog-draggable"
import {
  Menus
} from "@/router/menu.js"

import filter from "@/filters/filters.js"

import customComponents from "@/components/pagecomponents/index"
//import '~/css/bootstrap.min.css'
// import '~/css/style.css'
// import '~/css/custom.css'
import '~/css/index.scss'
import icon from "@/assets/icon"
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(customComponents)
Vue.use(DlgDraggable,{
  containment: true
});

//当刷新时，加载动态路由
let currentUser = JSON.parse(window.sessionStorage.getItem('user'))
if (currentUser) { //存在 当前登录用户，说明是刷新。
  // let cacheRouters = JSON.parse(window.sessionStorage.getItem("routers")); //取数路由信息
  // let aaa = Menus;
  store.commit("SET_ROUTERS", null)
  router.addRoutes(store.state.sys.addRouters);
}

router.beforeEach((to, from, next) => {
  let currentUser = JSON.parse(window.sessionStorage.getItem('user'))
  if (currentUser && to.path === '/login') {
    //这里不使用router进行跳转，是因为，跳转到登录页面的时候，是需要重新登录，获取数据的，这个时候，会再次向router实例里面add路由规则，
    //而next()跳转过去之后，没有刷新页面，之前的规则还是存在的，但是使用location的话，可以刷新页面，当刷新页面的时候，整个app会重新加载
    //而我们在刷新之前已经把sessionStorage里的user移除了，所以上面的添加路由也不行执行
    window.sessionStorage.removeItem('user')
    window.sessionStorage.removeItem('isLoadNodes')
    window.location.href = '/'
    return false
  }
  if (!currentUser && to.path !== '/login') { //用户没有登录，并且路径不是login
    next({
      path: '/login'
    })
  } else {
    if (to.path) {
      //to.matched.length 这里可以用length，检查是否路径匹配
      //console.log(to.matched.length)
      next()
    } else {
      next({
        path: '/error'
      })
    }
  }
})
router.afterEach((to, from) => {
  //console.log("afterEach--------------" + to.path + "---------")
  // window.sessionStorage.setItem('new', JSON.stringify({
  //   'path': to.path
  // }))
})
router.onError(function (error) {
  console.log(error)
})


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
