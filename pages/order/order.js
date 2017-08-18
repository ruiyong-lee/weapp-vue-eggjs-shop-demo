// pages/order/order.js
var ZanTab = require('../../style/zanui/tab/index');
var app = getApp();

Page(Object.assign({}, ZanTab, {
  data: {
    tab: {
      list: app.Constants.orderTabList,
      selectedId: 'all',
      scroll: false,
      height: 45
    },
    orderStatusTipMap: app.Constants.orderStatusTipMap,
    goodsOrder: null,
    page: 0,
    loadmore: false
  },

  onLoad(option) {
    var status = option.status

    wx.setNavigationBarTitle({
      title: '订单'
    })
    this.setData({
      'tab.selectedId': status
    })
    this.getOrderList();
  },

  //获取订单列表
  getOrderList() {
    var that = this;
    var params = app.Http.buildParams()
    params.body.queryFilter = app.Http.buildFilter({ params: { status: this.data.tab.selectedId }, page: this.data.page })
    app.Http.request('queryOrderBill.do', params, function (res) {
      var data = JSON.parse(res)
      console.log(data)

      that.setData({
        goodsOrder: data
      })
    })
  },
  //取消订单
  cancelOrderBill(e) {
    var that = this;

    wx.showModal({
      title: '提示',
      content: '狠心取消订单？',
      success: function (res) {
        if (res.confirm) {
          var order = e.currentTarget.dataset.order;
          var params = app.Http.buildParams()
          params.body = {
            uuid: order.uuid,
            version: order.version
          }
          app.Http.request('cancelOrderBill.do', params, function (res) {
            wx.showToast({ title: '取消订单成功', icon: 'success', duration: 2000 })
            that.getOrderList();
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //切换tab
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;

    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
    this.getOrderList();
  },
  //滚动
  handleScrollOrderContent(e) {
    var that = this;
   
    //加载更多订单 TODO 判断页数才执行下面的函数
  }
}));