import {
  Menus
} from "@/router/menu.js"

const systemConfig = {
  state: {
    collapse: true,
    pwdCollapse: false,
    asideWidth: 65,
    screen: {
      //工作区高度：去除header,footer之后，初始后赋值，窗口resize时调整，默认值为最小高度
      contentHeight: 500,
      workAreaHeight: 680,
      DataHeight: 400,
      queryAreaHeight: 50
    },
    items: [],
    isLoadRoutes: false,
    addRouters: []

  },
  mutations: {
    CHANGE_SET: (state, value) => {
      if (value == undefined) {
        state.collapse = !state.collapse;
      } else {
        state.collapse = value ? true : false;
      }
      state.asideWidth = state.collapse ? 65 : 200;

    },
    PWD_SET: (state, value) => {
      state.pwdCollapse = value;
    },
    EXPAND_MENU(state, menuItem) {
      if (menuItem.index > -1) {
        if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
          state.items[menuItem.index].meta.expanded = menuItem.expanded
        }
      } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
        menuItem.item.meta.expanded = menuItem.expanded
      }
    },
    LOAD_ROUTES(state) {
      state.isLoadRoutes = !state.isLoadRoutes
    },
    SET_ROUTERS: (state, obj) => {
      state.addRouters = obj.asRouters; //动态路由表
      state.isLoadRoutes = true; //登录状态
      state.screen.contentHeight = document.documentElement.clientHeight;
      state.screen.workAreaHeight = state.screen.contentHeight - 120; //去除footer,header
      state.screen.DataHeight = state.screen.workAreaHeight - 80;
    },
    CLEAR_ROUTERS: (state) => {
      // state.routers = routes;
      // state.addRouters = [];
      // state.perms = false;

      // window.location.reload(); //此处退出vuex状态不刷新，目前发现重载页面可以处理。。
    }
  },
  actions: {
    setCollapse({
      commit
    }, value) {
      commit('CHANGE_SET', value);
    },
    setPwd({
      commit
    }, value) {
      commit('PWD_SET', value);
    },
    setRouters({
      commit
    }) {


      return new Promise((resolve, reject) => { //动态加载路由权限
        // $http.post(api.getPerms)
        //   .then(res => {
        //     console.log(res);
        //     let asRouters;
        //     if (res.body.perms == '*') {
        //       asRouters = ansycRoutes;
        //     } else {
        //       asRouters = getansycRoutes(ansycRoutes, res.body.perms); //递归过滤
        //     }
        //     commit('SET_ROUTERS', {
        //       asRouters: asRouters,
        //       permsList: res.body.perms,
        //       _site_id_param: res.body.sites,
        //       siteId: res.body.siteId,
        //       isMasterSite: res.body.isMasterSite
        //     });
        //     resolve(res);
        //   }).catch(error => {
        //     reject(error);
        //   })
        let asRouters = Menus;


        commit('SET_ROUTERS', {
          asRouters: asRouters
        });
        let res = {
          code: "200"
        };

        resolve(res);
      })
    }
  }
}

export default systemConfig
