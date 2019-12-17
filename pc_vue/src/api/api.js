// api封装
import { post, get } from './http';
import { Constants } from '../utils/constants';

const {
  MERCHANT, ORDER, GOODS, GOODS_CATEGORY, FREIGHT_PLAN, DELIVERY_TIME_TYPE,
} = Constants;

export default {
  // 商家
  merchant: {
    saveNew: (params) => post('user/merchant/saveNew', params, MERCHANT), // 新增商家
    saveModify: (params) => post('user/merchant/saveModify', params, MERCHANT), // 保存商家修改
    query: (params) => post('user/merchant/query', params), // 获取分页商家列表
    get: (params) => get('user/merchant/get', params), // 获取商家
  },

  // 订单
  order: {
    query: (params) => post('bill/order/query', params), // 获取分页订单列表
    get: (params) => get('bill/order/get', params), // 获取订单
    dispatch: (params) => post('bill/order/dispatch', params, ORDER), // 配送订单
    complete: (params) => post('bill/order/complete', params, ORDER), // 完成订单
  },

  // 商品
  goods: {
    saveNew: (params) => post('goods/saveNew', params, GOODS), // 新增商品
    saveModify: (params) => post('goods/saveModify', params, GOODS), // 保存商品修改
    up: (params) => post('goods/up', params, GOODS), // 上架商品
    down: (params) => post('goods/down', params, GOODS), // 下架商品
    query: (params) => post('goods/query', params), // 获取分页商品列表
    get: (params) => get('goods/get', params), // 获取商品
  },

  // 商品类别
  goodsCategory: {
    saveNew: (params) => post('goodsCategory/saveNew', params, GOODS_CATEGORY), // 新增类别
    saveModify: (params) => post('goodsCategory/saveModify', params, GOODS_CATEGORY), // 保存类别修改
    remove: (params) => post('goodsCategory/remove', params, GOODS_CATEGORY), // 删除类别
    query: (params) => post('goodsCategory/query', params), // 获取分页类别列表
    get: (params) => get('goodsCategory/get', params), // 获取类别
    getDropdownList: (params) => get('goodsCategory/getDropdownList', params), // 获取类别
  },

  // 运费方案
  freightPlan: {
    saveNew: (params) => post('freightPlan/saveNew', params, FREIGHT_PLAN), // 新增运费方案
    saveModify: (params) => post('freightPlan/saveModify', params, FREIGHT_PLAN), // 保存运费方案修改
    remove: (params) => post('freightPlan/remove', params, FREIGHT_PLAN), // 删除运费方案
    query: (params) => post('freightPlan/query', params), // 获取分页运费方案列表
    get: (params) => get('freightPlan/get', params), // 获取运费方案
  },

  // 运费方案
  deliveryTimeType: {
    saveNew: (params) => post('deliveryTimeType/saveNew', params, DELIVERY_TIME_TYPE), // 新增送货时间
    saveModify: (params) => post('deliveryTimeType/saveModify', params, DELIVERY_TIME_TYPE), // 保存送货时间修改
    remove: (params) => post('deliveryTimeType/remove', params, DELIVERY_TIME_TYPE), // 删除送货时间
    query: (params) => post('deliveryTimeType/query', params), // 获取分页送货时间列表
    get: (params) => get('deliveryTimeType/get', params), // 获取送货时间
  },

  // 统计
  statistics: {
    order: {
      getForDay: (params) => get('statistics/order/getForDay', params), // 获取今日订单数量统计
      getForWeek: (params) => get('statistics/order/getForWeek', params), // 获取近七天订单统计
    },
  },

  // 消息通知
  notice: {
    readAll: (params) => post('notice/readAll', params), // 全部标记为已读
    overview: (params) => get('notice/overview', params), // 获取消息概况（最多5条）
    query: (params) => post('notice/query', params), // 获取消息分页列表
  },

  // 公共
  login: (params) => post('user/login', params), // 登录
  logout: (params) => post('user/logout', params), // 注销
  savePasswordModify: (params) => post('user/savePasswordModify', params), // 修改密码
};
