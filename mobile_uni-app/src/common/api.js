import http from './http';

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */

export default {
  customer: {
    queryList: (data, options) => http.post('customer/queryList', data, options), // 查询符合条件的客户
  },
  driver: {
    getCurrentUser: (data, options) => http.get('driver/getCurrentUser', data, options), // 获取当前司机信息
  },
  dump: {
    queryList: (data, options) => http.post('dump/queryList', data, options), // 查询符合条件的堆场
  },
  faultType: {
    queryList: (data, options) => http.post('faultType/queryList', data, options), // 查询符合条件的故障类型
  },
  goodsType: {
    queryList: (data, options) => http.post('goodsType/queryList', data, options), // 查询符合条件的货物类型列表
  },
  login: {
    autoLogin: (data, options) => http.post('login/autoLogin', data, options), // 自动登录
    loginByPassword: (data, options) => http.post('login/loginByPassword', data, options), // 用户登录
  },
  maintainFactory: {
    queryList: (data, options) => http.post('maintainFactory/queryList', data, options), // 查询符合条件的维修厂
  },
  maintainRecord: {
    save: (data, options) => http.post('maintainRecord/save', data, options), // 查询符合条件的维修厂
    getUncompletedRecord: (data, options) => http.get('maintainRecord/getUncompletedRecord', data, options), // 查询未完成的维保记录
  },
  order: {
    addTransport: (data, options) => http.post('order/addTransport', data, options), // 货车发车
    finish: (data, options) => http.post('order/finish', data, options), // 完成
    finishTransport: (data, options) => http.post('order/finishTransport', data, options), // 货车卸车
    get: (data, options) => http.get('order/get', data, options), // 查询订单
    queryDriverIndexOrderList: (data, options) => http.post('order/queryDriverIndexOrderList', data, options), // 查询司机首页订单
    queryMyOrderList: (data, options) => http.post('order/queryMyOrderList', data, options), // 查询我的订单
    queryTransportRecord: (data, options) => http.post('order/queryTransportRecord', data, options), // 查询符合条件的运输记录
    save: (data, options) => http.post('order/save', data, options), // 查询我的订单
    startTransport: (data, options) => http.post('order/startTransport', data, options), // 签到
  },
  project: {
    queryList: (data, options) => http.post('project/queryList', data, options), // 查询符合条件的项目
  },
  qiniu: {
    token: (data, options) => http.get('qiniu/token', data, options), // 获取七牛云token
  },
  statistic: {
    queryOrderStatusStatistic: (data, options) => http.get('statistic/queryOrderStatusStatistic', data, options), // 查询订单状态报表数据
    queryVehicleStatusStatistic: (data, options) => http.get('statistic/queryVehicleStatusStatistic', data, options), // 查询车辆状态报表数据
    queryWxaDriverSelfBizStatistic: (data, options) => http.get('statistic/queryWxaDriverSelfBizStatistic', data, options), // 查询小程序司机自己业务数据报表
  },
  vehicle: {
    queryList: (data, options) => http.post('vehicle/queryList', data, options), // 查询符合条件的车辆
  },
};
