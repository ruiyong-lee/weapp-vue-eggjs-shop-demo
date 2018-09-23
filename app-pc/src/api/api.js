// api封装
import { get, post } from './http';

export default {
  login: params => post('user/login', params), // 登录
  createMechant: params => post('user/merchant/saveNew', params), // 新增商家
  queryMechant: params => post('user/merchant/query', params), // 获取分页商家列表
};
