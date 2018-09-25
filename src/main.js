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
import {
  testMenus
} from "@/router/test.js"
import customComponents from "@/components/pagecomponents/index"
//import '~/css/bootstrap.min.css'
// import '~/css/style.css'
// import '~/css/custom.css'

import '~/css/index.scss'

import icon from "@/assets/icon"

import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
//router.addRoutes(Menus)
Vue.config.productionTip = false
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(customComponents)
Vue.use(DlgDraggable);
let currentUser = window.sessionStorage.getItem('user');
if (currentUser != undefined) {
  let data = JSON.parse(currentUser)
  if (data) {
    let routes = Menus //鍔ㄦ�佸鍔犵殑璺敱
    router.addRoutes(routes)
    //  this.$router.addRoutes(routes)
    window.sessionStorage.removeItem('isLoadNodes') //璺敱鐘舵�?
  }
}
// test git 测试修改，并提交
var getLastUrl = (str, yourStr) => str.slice(str.lastIndexOf(yourStr))
router.beforeEach((to, from, next) => {

  next()
  /* must call `next` */
})
router.afterEach((to, from) => {
  console.log("afterEach--------------" + to.path + "---------")

  window.sessionStorage.setItem('new', JSON.stringify({
    'path': to.path
  }))
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

var testData = {
  price: 2,
  quantity: 5
};
let target = null;

class Dep {
  constructor() {
    this.subscribes = [];
  }
  depend() {
    if (target && !this.subscribes.includes(target)) {
      this.subscribes.push(target);
    }
  }
  notify() {
    this.subscribes.forEach(sub => sub());
  }
}

Object.keys(testData).forEach(key => {
  let internalValue = testData[key];
  const dep = new Dep();
  Object.defineProperty(testData, key, {
    get() {
      dep.depend();
      return internalValue;
    },
    set(newVal) {
      internalValue = newVal;
      dep.notify();
    }
  });
});

function watcher(myFunc) {
  target = myFunc;
  target();
  target = null;
}

watcher(() => {
  testData.total = testData.price * testData.quantity;
});

// console.log(testData.total);
// testData.price = 20;
// console.log(testData.total);
// testData.price = 30;
// console.log(testData.total);
// testData.quantity = 10
// console.log(testData.total);
