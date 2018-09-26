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
Vue.use(DlgDraggable);
let currentUser = window.sessionStorage.getItem('user');
if (currentUser != undefined) {
  let data = JSON.parse(currentUser)
  if (data) {
    store
      .dispatch("setRouters")
      .then(res => {
        if (res.code == "200") {
          router.addRoutes(store.state.sys.addRouters);
        } else {}
      })
      .catch(error => {
        console.log(error);
      });
  }
}
// test git 测试内容提交

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

      next()
    } else {
      next({
        path: '/nofound'
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
