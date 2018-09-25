import customInput from './input/Input.vue' //横向标签组件
import customButton from './Button.vue' //custom图标按钮组件
import customPagination from './Pagination.vue' //分页
// 这里是重点
const customComponents = {
  install: function (Vue) {

    Vue.component('customInput', customInput);
    Vue.component('customButton', customButton);
    Vue.component('customPagination', customPagination);
  }
}

// 导出组件
export default customComponents
