// api封装
import { post, get } from './http';
import { Constants } from '../utils/constants';

export default {
  // 商家
  merchant: {
    saveNew: params => post('user/merchant/saveNew', params, Constants.MERCHANT), // 新增商家
    saveModify: params => post('user/merchant/saveModify', params, Constants.MERCHANT), // 保存商家修改
    query: params => get('user/merchant/query', params), // 获取分页商家列表
    get: params => get('user/merchant/get', params), // 获取商家
  },

  // 订单
  order: {
    saveNew: params => post('bill/order/saveNew', params, Constants.ORDER), // 新增商家
    saveModify: params => post('bill/order/saveModify', params, Constants.ORDER), // 保存商家修改
    query: params => get('bill/order/query', params), // 获取分页商家列表
    get: params => get('bill/order/get', params), // 获取商家
  },

  // 商品
  goods: {
    saveNew: params => post('goods/saveNew', params, Constants.GOODS), // 新增商品
    saveModify: params => post('goods/saveModify', params, Constants.GOODS), // 保存商品修改
    up: params => post('goods/up', params, Constants.GOODS), // 上架商品
    down: params => post('goods/down', params, Constants.GOODS), // 下架商品
    query: params => get('goods/query', params), // 获取分页商品列表
    get: params => get('goods/get', params), // 获取商品
  },

  // 商品类别
  goodsCategory: {
    saveNew: params => post('goodsCategory/saveNew', params, Constants.GOODS_CATEGORY), // 新增类别
    saveModify: params => post('goodsCategory/saveModify', params, Constants.GOODS_CATEGORY), // 保存类别修改
    delete: params => post('goodsCategory/delete', params, Constants.GOODS_CATEGORY), // 删除类别
    query: params => get('goodsCategory/query', params), // 获取分页类别列表
    get: params => get('goodsCategory/get', params), // 获取类别
    getDropdownList: params => get('goodsCategory/getDropdownList', params), // 获取类别
  },

  // 公共
  login: params => post('user/login', params), // 登录
  logout: params => post('user/logout', params), // 注销
  savePasswordModify: params => post('user/savePasswordModify', params), // 修改密码
};
