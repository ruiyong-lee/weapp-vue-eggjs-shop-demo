// pages/order/order.js
var ZanTab = require('../../style/zanui/tab/index');
var app = getApp();

Page(Object.assign({}, ZanTab, {
  data: {
    tab: {
      list: app.Constants.orderTabList,
      selectedId: 'all',
      scroll: true,
      height: 45
    },
    orderStatusTipMap: app.Constants.orderStatusTipMap,
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