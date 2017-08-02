// pages/order/order.js
var ZanTab = require('../../style/zanui/tab/index');
var app = getApp();

Page(Object.assign({}, ZanTab, {
  data: {
    tab: {
      list: [
        { id: 'all', title: '全部' },
        { id: 'unPayment', title: '待付款' },
        { id: 'receipted', title: '已接单' },
        { id: 'dispatching', title: '配送中' },
        { id: 'completed', title: '已完成' },
        { id: 'canceled', title: '已取消' }
      ],
      selectedId: 'all',
      scroll: true,
      height: 45
    },
    orderStatusTipMap:{
      unPayment: '等待买家付款',
      receipted: '商家已接单',
      dispatching: '正在配送',
      completed: '已完成',
      canceled: '已取消',
    },
    goodsOrderList: []
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '订单'
    })
    this.getOrderList();
  },

  //获取订单列表
  getOrderList() {
    var that = this;
    var params = app.Http.buildParams()
    app.Http.request('goodsOrder/queryList.do', params, function (res) {
      if (res) {
        that.setData({
          goodsOrderList: res.data
        })
      }
    })
  },

  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;

    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
  }
}));