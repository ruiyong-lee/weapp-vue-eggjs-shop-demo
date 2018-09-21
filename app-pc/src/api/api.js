// api封装
import { get, post } from './http';

export default {
  login: params => post('user/login', params), // 登录
  createMechant: params => post('user/merchant/saveNew', params), // 新增商家
};
