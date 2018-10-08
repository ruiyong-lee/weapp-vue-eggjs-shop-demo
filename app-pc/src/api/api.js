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

  // 订单
  order: {
    saveNew: params => post('bill/order/saveNew', params, Constants.ORDER), // 新增商家
    saveModify: params => post('bill/order/saveModify', params, Constants.ORDER), // 保存商家修改
    query: params => post('bill/order/query', params), // 获取分页商家列表
    get: params => post('bill/order/get', params), // 获取商家
  },

  // 类别
  goodsCategory: {
    saveNew: params => post('goodsCategory/saveNew', params, Constants.GOODS_CATEGORY), // 新增类别
    saveModify: params => post('goodsCategory/saveModify', params, Constants.GOODS_CATEGORY), // 保存类别修改
    delete: params => post('goodsCategory/delete', params, Constants.GOODS_CATEGORY), // 删除类别
    query: params => post('goodsCategory/query', params), // 获取分页类别列表
    get: params => post('goodsCategory/get', params), // 获取类别
  },

  // 公共
  login: params => post('user/login', params), // 登录
  logout: params => post('user/logout', params), // 注销
  savePasswordModify: params => post('user/savePasswordModify', params), // 修改密码
};
