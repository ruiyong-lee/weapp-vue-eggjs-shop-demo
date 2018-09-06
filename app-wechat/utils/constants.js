// 常量

module.exports = {
  //登录
  PLATFORM: 'mobile',
  USER_IDENTITY: 'customer',
  ORG_UUID_KEY: 'orgUuid',
  ORG_NAME_KEY: 'orgName',
  USER_UUID_KEY: 'userUuid',
  USER_NAME_KEY: 'userName',
  MERCHANT_UUID: 'f39c66885eb7a670015eb7d928fe0003', //根据不同商家手动配置

  //分页
  pageSize: 5,

  //正则
  TELEPHONE_CELLPHONE_REGEX: '(^(0[0-9]{2,3}\\-)([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$)|((400|800)([0-9\\-]{7,10}))|(^(0|86|17951)?1[0-9]{10}$)',

  //错误提示
  getCartFailTip: '无法获取购物车',
  addToCartFailTip: '无法添加到购物车',
  getCheckFailTip: '无法获取勾选数据',
  saveCheckFailTip: '无法保存勾选数据',
  requestFailTip: '服务器开了点小差，请重试或者联系客服',
  selectAddressTip: '请选择地址',
  serviceErrorTip: '服务器出了点问题，请联系客服',

  //客服电话
  servicePhone: '18359197148',

  //订单
  orderTabList: [
    { id: 'all', title: '全部' },
    { id: 'initial', title: '待付款' },
    { id: 'audited', title: '已接单' },
    { id: 'dispatching', title: '配送中' },
    { id: 'completed', title: '已完成' },
    { id: 'canceled', title: '已取消' }
  ],
  orderStatusTipMap: {
    initial: '等待付款',
    audited: '商家已确认',
    dispatching: '正在配送',
    completed: '已完成',
    canceled: '已取消',
  }
}