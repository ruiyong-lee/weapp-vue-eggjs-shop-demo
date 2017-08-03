// 常量

module.exports = {
  getCartFailTip: '无法获取购物车',
  addToCartFailTip: '无法添加到购物车',
  getCheckFailTip: '无法获取勾选数据',
  saveCheckFailTip: '无法保存勾选数据',
  requestFailTip:'服务器开了点小差，请重试或者联系客服',

  //订单
  orderTabList: [
    { id: 'all', title: '全部' },
    { id: 'unPayment', title: '待付款' },
    { id: 'receipted', title: '已接单' },
    { id: 'dispatching', title: '配送中' },
    { id: 'completed', title: '已完成' },
    { id: 'canceled', title: '已取消' }
  ],
  orderStatusTipMap: {
    unPayment: '等待付款',
    receipted: '已接单',
    dispatching: '正在配送',
    completed: '已完成',
    canceled: '已取消',
  }
}