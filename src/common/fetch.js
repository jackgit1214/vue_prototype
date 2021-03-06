import axios from 'axios'
import qs from 'qs'
import {
  Message
} from 'element-ui'
import {
  setBaseUrl
} from '@/config.js'

function showMessage(value) {
  return Message({
    showClose: true,
    message: value,
    type: 'error',
    duration: 3500
  });
}


axios.defaults.baseURL = setBaseUrl();
axios.defaults.timeout = 15000;
/**
 * 请求拦截器
 * 
 */
axios.interceptors.request.use(config => { //在此处统一配置公共参数

  // let appId = process.env.appId; //appid
  // let appKey = process.env.appKey; //appkey
  // let sessionKey = localStorage.getItem('sessionKey'); //sessionkey
  // let _site_id_param = localStorage.getItem('_site_id_param') || ''; //站点id
  // let params = {
  //   appId: appId, //appid
  //   nonce_str: 123, //getRand(), //随机数
  //   _site_id_param: _site_id_param
  // };
  // if (sessionKey && sessionKey != '') {
  //   params.sessionKey = sessionKey;
  // }
  // for (let key in config.data) {
  //   params[key] = config.data[key]; //添加进参数列表
  // }
  // params = signParams(params, appKey); //返回签名后的对象
  config.data = qs.stringify(config.data); //序列化
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return config;
}, error => {

  Promise.reject(error); // 错误提示
})


/**响应拦截器 */
axios.interceptors.response.use(response => {
    //console.log("======================================")
    //console.log(response)
    let res = {};
    res.data = response.data;
    res.code = response.status
    res.message = response.statusText
    switch (res.code) {
      case '200':

        break;
      case '301':

        break;
      case '304':

        break;
      case '3':
        showMessage(res.code + ":" + res.message);
        localStorage.setItem('sessionKey', '');
        localStorage.setItem('userName', '');
        router.push('/login');
        break;
      case '302':
        showMessage(res.code + ":" + res.message);
        localStorage.setItem('sessionKey', '');
        localStorage.setItem('userName', '');
        router.push('/login');
        break;
      default:

        // showMessage(res.code + ":" + res.message);
        break;
    }
    return response.data;
  },
  error => {
    showMessage('服务器响应失败');
    console.log(error)
    return Promise.reject(error)
  }
);

export default axios
