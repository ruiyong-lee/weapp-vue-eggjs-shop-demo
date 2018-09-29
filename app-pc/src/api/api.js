// api封装
import { post } from './http';
import { Constants } from '../utils/constants';

export default {
  // 商家
  merchant: {
    saveNew: params => post('user/merchant/saveNew', params, Constants.MERCHANT), // 新增商家
    saveModify: params => post('user/merchant/saveModify', params, Constants.MERCHANT), // 保存商家修改
    query: params => post('user/merchant/query', params), // 获取分页商家列表
    get: params => post('user/merchant/get', params), // 获取商家
  },

  // 公共
  login: params => post('user/login', params), // 登录
  logout: params => post('user/logout', params), // 注销
  savePasswordModify: params => post('user/savePasswordModify', params), // 修改密码
};
