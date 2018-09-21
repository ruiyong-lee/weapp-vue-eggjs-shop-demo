// axios封装
import axios from 'axios';
import { MessageBox } from 'element-ui';
import router from '../router';

// 环境的切换
// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = '/api';
// } else if (process.env.NODE_ENV === 'debug') {
//   axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = 'http://api.123dailu.com/';
// }

// 请求超时时间
// axios.defaults.timeout = 10000;

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  config => config,
  error => Promise.error(error),
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    const { data: responseData } = response;
    const { code, message } = responseData;

    if (code !== 0) {
      MessageBox.alert(message, '提示', {
        type: 'warning',
      });
      return Promise.reject(response);
    }
    return Promise.resolve(responseData);
  },
  // 服务器状态码不是200的情况
  (error) => {
    const { response } = error;
    const { status, data = {} } = response || {};

    switch (status) {
      case 401:
        // 未登录或过期
        router.replace({ name: 'login' });
        break;
      case 500:
        MessageBox.alert('服务器出错', '提示', {
          type: 'error',
        });
        break;
      default:
        MessageBox.alert(data.message, '提示', {
          type: 'error',
        });
    }
    return Promise.reject(response);
  },
);

// get方法
export function get(url, params) {
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
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then((res) => {
      resolve(res.data);
    }).catch((err = {}) => {
      reject(err);
    });
  });
}
