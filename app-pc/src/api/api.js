// api封装
import { get, post } from './http';

export default {
  login: params => post('user/login', params), // 登录
  getUserInfo: params => post('user/get', params), // 获取用户信息
};
