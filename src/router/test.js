import indexManager from '@/components/indexmanager/indexManager'
import codeIndex from '@/components/code/codeindex'
import mainFrame from '@/components/mainframe.vue'


/**
 * 默认系统菜单
 */
export const testMenus = [{
  path: '/system',
  name: '系统管理',
  component: resolve => {
    require(['@/components/mainframe.vue'], resolve)
  },
  isParent: true,
  children: [{
    path: 'index',
    name: '指标维护',
    component: indexManager
  }, {
    path: 'code',
    name: '代码维护',
    component: codeIndex
  }]
}];
