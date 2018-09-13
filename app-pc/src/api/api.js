// api封装
import { get, post } from './http.js';

export default {
  // 首页
  test: params => get('1/2', params), // 测试

  // 蚂蚁地推
  test2: params => post('1/2', params), // 测试

  // 推广
  // 我的
};
