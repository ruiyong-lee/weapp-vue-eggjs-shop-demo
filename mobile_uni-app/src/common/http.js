/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import isEmpty from 'lodash/isEmpty';
import constants from './constants';

let baseUrl = ''; // H5用相对路径

// #ifndef H5
baseUrl = 'http://192.168.96.129:7001/'; // 非H5用绝对路径
// #endif

export default {
  defaultConfig: {
    baseUrl,
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      platform: constants.PLATFORM,
      userIdentity: constants.USER_IDENTITY,
      orgUuid: constants.MERCHANT_UUID,
      nickName: '',
    },
    method: 'GET',
    dataType: 'json', // 如设为json，会对返回的数据做一次 JSON.parse
    responseType: 'text',
    showLoading: true, // 显示loading提示
    success() {
    },
    fail() {
    },
    complete() {
    },
  },
  interceptor: {
    request: null,
    response: null,
  },
  async request(options = {}) {
    const { defaultConfig, interceptor, getUserInfo } = this;
    const { nickName } = await getUserInfo();

    defaultConfig.header.sessionid = uni.getStorageSync(constants.SESSION);
    options.url = `${options.baseUrl || defaultConfig.baseUrl}${options.url}`;
    options.data = {
      ...defaultConfig.data,
      ...options.data,
      nickName,
    };

    return new Promise((resolve, reject) => {
      let config = null;

      // 请求完成
      options.complete = (response = {}) => {
        const { statusCode, data: responseData } = response;
        const { code, data, message } = responseData || {};

        response.config = config;

        // 关闭loading
        if (config.showLoading) {
          uni.hideLoading();
        }

        // response拦截器
        if (typeof interceptor.response === 'function') {
          const newResponse = interceptor.response(response);
          if (newResponse) {
            response = newResponse;
          }
        }

        // 服务器状态码
        if (statusCode === 200) {
          // 请求成功
          // 业务状态码
          if (code === 0) {
            resolve(data);
          } else {
            // 其他错误
            uni.showModal({
              title: '提示',
              content: message,
              showCancel: false,
            });
            reject(response);
          }
        } else if (statusCode === 401) {
          // 尚未登录
          uni.reLaunch({ url: '/pages/user/login' });
        } else {
          // 其他错误
          uni.showModal({
            title: '提示',
            content: message || constants.SERVICE_ERROR_TIP,
            showCancel: false,
          });
          reject(response);
        }
      };

      // 合并配置
      config = { ...defaultConfig, ...options };
      config.requestId = Date.now();

      // 打开loading
      if (config.showLoading) {
        uni.showLoading({ title: '加载中...' });
      }

      // request拦截器
      if (typeof interceptor.request === 'function') {
        interceptor.request(config);
      }

      uni.request(config);
    });
  },
  get(url, data, options = {}) {
    return this.request({
      ...options,
      url,
      data,
      method: 'GET',
    });
  },
  post(url, data, options = {}) {
    return this.request({
      ...options,
      url,
      data,
      method: 'POST',
    });
  },
  put(url, data, options = {}) {
    return this.request({
      ...options,
      url,
      data,
      method: 'PUT',
    });
  },
  delete(url, data, options = {}) {
    return this.request({
      ...options,
      url,
      data,
      method: 'DELETE',
    });
  },
  // 获取微信用户信息
  getUserInfo() {
    return new Promise((resolve, reject) => {
      const { userInfo } = getApp().globalData;

      if (!isEmpty(userInfo)) {
        resolve(userInfo);
      }

      uni.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            uni.getUserInfo({
              withCredentials: false,
              success: ({ userInfo: info = {} }) => {
                getApp().globalData.userInfo = info;
                resolve(info);
              },
            });
          } else {
            // 未授权，跳转授权页面
            uni.reLaunch({ url: '/pages/user/authorize' });
            reject();
          }
        },
      });
    });
  },
};
