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
    goodsOrderList: [],
    page: 1,
    pageSize: 10,
    loadmore: false,
    isLastPage: false
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
  getOrderList(cb) {
    var { page, pageSize, tab } = this.data
    var params = app.Http.buildParams({
      filter: { status: tab.selectedId === 'all' ? '' : tab.selectedId},
      pagination: { page, pageSize }
    })

    app.Http.request({
      url: 'queryOrderBill',
      data: params,
      success: (res = {}) => {
        var result = this.data.goodsOrderList.concat(res.rows)

        if (page * pageSize >= res.count && res.count > 0) {
          this.setData({
            isLastPage: true
          })
        }

        this.setData({
          goodsOrderList: result,
          loadmore: false,
        })

        return typeof cb === "function" && cb()
      }
    })
  },
  //取消订单
  cancelOrderBill(e) {
    var that = this;
    var dataset = e.currentTarget.dataset
    var order = dataset.order;
    var index = dataset.index;
    app.cancelOrderBill(order, function () {
      that.setData({
        [`goodsOrderList[${index}].status`]: 'canceled'
      });
    });
  },
  //再次购买
  orderAgain(e) {
    var orderUuid = e.currentTarget.dataset.orderUuid;

    this.getOrder(orderUuid, function (order) {
      var orderLines = order.lines
      app.orderAgain(orderLines)
    })
  },
  //确认收货
  completeOrder(e) {
    var that = this;
    var dataset = e.currentTarget.dataset
    var order = dataset.order;
    var index = dataset.index;
    app.completeOrderBill(order, function () {
      that.setData({
        [`goodsOrderList[${index}].status`]: 'completed'
      });
    });
  },
  //获取订单信息
  getOrder(orderUuid, cb) {
    var that = this;
    var params = app.Http.buildParams()
    params.uuid = orderUuid

    app.Http.request({
      url: 'getOrderBill',
      data: params,
      success(res) {
        return typeof cb === "function" && cb(res || null)
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
    this.reset();
    this.getOrderList();
  },
  //滚动
  handleScrollOrderContentToLower(e) {
    if (!this.data.isLastPage && !this.data.loadmore) {
      this.setData({
        page: ++this.data.page,
        loadmore: true
      })
      this.getOrderList();
    }
  },
  //重置请求参数
  reset() {
    this.setData({
      goodsOrderList: [],
      page: 1,
      loadmore: false,
      isLastPage: false
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.reset();
    this.getOrderList(function () {
      wx.stopPullDownRefresh()
    });
  }
}));