// pages/orderDetail/orderDetail.js

var app = getApp();

Page({
  data: {
    status: '',
    address: null,
    goodsOrder: {},
    deliveryTimeMap: [],
    deliveryTimeArr: [],
  },

  onLoad(option) {
    var status = option.status;
    var goodsOrder = app.globalData.goodsOrder;

    wx.setNavigationBarTitle({
      title: status === 'account' ? '提交订单' : '订单详情'
    })
    this.setData({
      status: status,
      goodsOrder: goodsOrder
    })
    this.getDeliveryTimeType();
  },
  onShow() {
    this.refreshAddress();
  },

  //刷新地址
  refreshAddress() {
    var parentObj = {};
    var status = this.data.status;

    if (status === 'account') {
      //获取上次选中的地址
      parentObj = app.Storage.getStorageSync('address-selected', app.Constants.getCheckFailTip);
    } else {
      //获取订单内的地址
      parentObj = this.data.goodsOrder;
    }

    if (!app.Check.isUndeFinedOrNullOrEmpty(parentObj)) {
      this.setData({
        "goodsOrder.linkMan": parentObj.linkMan,
        "goodsOrder.linkPhone": parentObj.linkPhone,
        "goodsOrder.address": parentObj.address,
        "goodsOrder.addressUuid": status === 'account' ? parentObj.uuid : parentObj.addressUuid,
      })
    }
  },
  //获取收货时间列表
  getDeliveryTimeType() {
    var that = this;
    var params = app.Http.buildParams()
    app.Http.request('deliveryTimeType/gets.do', params, function (res) {
      var arr = [];
      var obj = {};
      var list = res.data;

      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var key = item.name + '（' + item.remark + '）';
        arr.push(key)
        obj[key] = item;
        if (i === 0) {
          that.setDeliveryTimeType(item);
        }
      }
      that.setData({
        deliveryTimeArr: arr,
        deliveryTimeMap: obj
      })
    })
  },
  //选择收货时间
  selectDeliveryTimeType: function () {
    var that = this;
    var list = that.data.deliveryTimeArr;
    wx.showActionSheet({
      itemList: list,
      success: function (res) {
        if (!res.cancel) {
          var key = list[res.tapIndex];
          var item = that.data.deliveryTimeMap[key];
          that.setDeliveryTimeType(item);
        }
      }
    });
  },
  //设置收货时间
  setDeliveryTimeType(data) {
    this.setData({
      "goodsOrder.deliveryTimeTypeUuid": data.uuid,
      "goodsOrder.deliveryTimeTypeName": data.name,
      "goodsOrder.deliveryTimeTypeRemark": data.remark,
      "goodsOrder.deliveryTimeTypeSurcharge": data.surcharge,
    })
    this.calculatePaymentAmount();
  },
  //计算总金额
  calculatePaymentAmount(){
    var goodsOrder = this.data.goodsOrder;
    var amount1 = app.Count.decimalAdd(goodsOrder.totalAmount, goodsOrder.freightAmount, 6);
    var paymentAmount = app.Count.decimalAdd(amount1, goodsOrder.deliveryTimeTypeSurcharge, 2);

    this.setData({
      "goodsOrder.paymentAmount": paymentAmount
    })
  }
})