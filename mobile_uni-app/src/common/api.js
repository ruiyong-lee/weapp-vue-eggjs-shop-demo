import http from './http';

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */

export default {
  goods: {
    getGoodsWithCategory: (data, options) => http.get('weapp/getGoodsWithCategory', data, options), // 查询带类别的商品信息
  },
  order: {
    getOrderBill: (data, options) => http.post('weapp/getOrderBill', data, options), // 获取订单
    queryOrderBill: (data, options) => http.post('weapp/queryOrderBill', data, options), // 获取订单列表
    createBill: (data, options) => http.post('weapp/createBill', data, options), // 新建订单
    auditBill: (data, options) => http.post('weapp/auditBill', data, options), // 审核订单
    cancelBill: (data, options) => http.post('weapp/cancelBill', data, options), // 取消订单
    completeBill: (data, options) => http.post('weapp/completeBill', data, options), // 完成订单
  },
  address: {
    getAddress: (data, options) => http.get('weapp/getAddress', data, options), // 获取地址
    getDefaultAddress: (data, options) => http.get('weapp/getDefaultAddress', data, options), // 获取默认地址
    setDefaultAddress: (data, options) => http.post('weapp/setDefaultAddress', data, options), // 设置默认地址
    deleteAddress: (data, options) => http.post('weapp/deleteAddress', data, options), // 删除地址
    getAddressList: (data, options) => http.get('weapp/getAddressList', data, options), // 获取地址列表
    saveNewAddress: (data, options) => http.post('weapp/saveNewAddress', data, options), // 新增地址
    saveModifyAddress: (data, options) => http.post('weapp/saveModifyAddress', data, options), // 编辑地址
  },
  deliveryTimeType: {
    getDeliveryTimeTypeList: (data, options) => http.get('weapp/getDeliveryTimeTypeList', data, options), // 获取收货时间列表
  },
  freightPlan: {
    getDefaultFreightPlan: (data, options) => http.get('weapp/getDefaultFreightPlan', data, options), // 获取默认运费方案
  },
  user: {
    login: (data, options) => http.post('weapp/login', data, options), // 用户登录
    getMerchant: (data, options) => http.get('weapp/getMerchant', data, options), // 获取商家信息
  },
};
