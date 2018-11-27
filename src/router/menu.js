import indexManager from '@/components/indexmanager/indexManager'
import codeIndex from '@/components/code/codeindex'
import userManager from '@/components/system/users/userindex.vue';
import departmentManager from "@/components/system/departments/departmentindex"

/**
 * 默认系统菜单
 */
export const Menus = [{
  path: '/system',
  name: '系统管理',
  component: resolve => {
    require(['@/components/mainframe.vue'], resolve)
  },
  isParent: true,
  children: [{
    path: '/system/index',
    name: '指标维护',
    component: indexManager
  }, {
    path: '/system/code',
    name: '代码维护',
    component: codeIndex
  }, {
    path: '/system/role',
    name: '角色维护',
    //component: role
  }, {
    path: '/system/user',
    name: '用户维护',
    component: userManager
  }, {
    path: '/system/department',
    name: '部门管理',
    component: departmentManager
  }, {
    path: '/system/depot',
    name: '库房维护',
    //component: depot
  }, {
    path: '/system/custom',
    name: '定制管理',
    //component: custom
  }]
}, {
  path: '/test222',
  name: '测试',
  component: resolve => {
    require(['@/components/mainframe.vue'], resolve)
  },
  isParent: false
}];
