// axios封装
import axios from 'axios';
import { MessageBox, Loading } from 'element-ui';
import store from '../store';
import router from '../router';

let saveNewOrModifyModule; // 记录请求的模块
const loadingInstances = []; // loading

// 环境的切换
// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = 'http://localhost:8081';
// } else if (process.env.NODE_ENV === 'debug') {
//   axios.defaults.baseURL = 'http://localhost:8081';
// } else if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = 'http://localhost:8081';
// }

// 请求超时时间
// axios.defaults.timeout = 10000;

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 加载loading
    const loadingInstance = Loading.service({
      background: 'rgb(0,0,0,0)',
    });
    loadingInstances.push(loadingInstance);
    return config;
  },
  error => Promise.error(error),
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    const { data = {} } = response;
    const { code, message } = data;

    // 关闭loading
    loadingInstances.pop().close();

    // 如果有模块A发起保存请求成功（意味着新建或修改），将模块A名称记录进map
    // 用于下次进入其他模块（比如：模块B）时，如果模块B内有调用模块A的请求数据接口，则触发请求，
    if (saveNewOrModifyModule) {
      store.commit('setRefreshDataMap', { key: saveNewOrModifyModule });
    }

    if (code !== 0) {
      MessageBox.alert(message, '提示', {
        type: 'warning',
      });
      return Promise.reject(response);
    }
    return Promise.resolve(data);
  },
  // 服务器状态码不是200的情况
  (error) => {
    const { response } = error;
    const { status, data = {} } = response || {};

    // 关闭loading
    loadingInstances.pop().close();

    switch (status) {
      case 401:
        // 未登录或过期
        router.push({ name: 'login' });
        break;
      case 404:
        MessageBox.alert('服务器出错', '提示', {
          type: 'error',
        });
        break;
      default:
        MessageBox.alert(data.message || '服务器出错', '提示', {
          type: 'error',
        });
    }
    return Promise.reject(response);
  },
);

/**
 * 请求方法封装，主要是为了新增或者修改的接口请求成功后，生成一个记录，其他页面根据此记录来决定数据是否需要刷新
 * @param {string} url - 请求地址
 * @param {object} params - 请求参数
 * @param {string=} module - 请求模块，新增或者修改的接口传此参数会生成一个以module为key记录
 * @return {object} - 查找结果
 */

// get方法
export function get(url, params, module) {
  saveNewOrModifyModule = module;

  return new Promise((resolve, reject) => {
    axios.get(url, {
      params,
    }).then((res) => {
      resolve(res.data);
    }).catch((err = {}) => {
      reject(err);
    });
  });
}

// post方法
export function post(url, params, module) {
  saveNewOrModifyModule = module;

  return new Promise((resolve, reject) => {
    axios.post(url, params).then((res) => {
      resolve(res.data);
    }).catch((err = {}) => {
      reject(err);
    });
  });
}
