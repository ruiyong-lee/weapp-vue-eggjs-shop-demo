// axios封装
import axios from 'axios';

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
    if (response.status === 200) {
      // TODO
      return Promise.resolve(response);
    }

    return Promise.reject(response);
  },
  // 服务器状态码不是200的情况
  error => Promise.reject(error.response),
);

// get方法
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params,
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err.data);
    });
  });
}

// post方法
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, JSON.stringify(params)).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err.data);
    });
  });
}
