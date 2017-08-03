// pages/orderDetail/orderDetail.js

var app = getApp();
var isGetDeliveryTimeType = false;//是否成功获取收货时间
var isGetFreightPlane = false;//是否成功获取运费方案

Page({
  data: {
    status: '',
    orderStatusTipMap: app.Constants.orderStatusTipMap,
    address: null,
    goodsOrder: {},
    deliveryTimeMap: [],
    deliveryTimeArr: [],
    canOrder: false
  },

  onLoad(option) {
    var status = option.status;
    var orderUuid = option.uuid;

    wx.setNavigationBarTitle({
      title: status === 'account' ? '提交订单' : '订单详情'
    })

    if (status === 'account') {
      //待提交订单
      var goodsOrder = app.globalData.goodsOrder;
      this.setData({
        status: status,
        goodsOrder: goodsOrder
      })
      this.getDeliveryTimeType();
      this.getFreightPlan();
    } else {
      //已提交订单
      this.getOrder();
    }
  },
  onShow() {
    this.refreshAddress();
  },

  getOrder() {
    var that = this;
    var params = app.Http.buildParams()
    app.Http.request('goodsOrder/get.do', params, function (res) {
      if (res) {
        that.setData({
          "goodsOrder": res.data
        })
      }
    })
  },

  //刷新地址
  refreshAddress() { 
    var addressSelected = app.Storage.getStorageSync('address-selected', app.Constants.getCheckFailTip);

    if (!app.Check.isUndeFinedOrNullOrEmpty(addressSelected)) {
      this.setData({
        "goodsOrder.linkMan": addressSelected.linkMan,
        "goodsOrder.linkPhone": addressSelected.linkPhone,
        "goodsOrder.address": addressSelected.address,
        "goodsOrder.addressUuid": status === 'account' ? addressSelected.uuid : addressSelected.addressUuid,
      })
    }
  },
  //跳转到地址选择
  jumpToSelectAddress(){
    if (this.data.status === 'account') {
      app.jumpTo('../address/address?status=select');
    }
  },

  //获取收货时间列表
  getDeliveryTimeType() {
    var that = this;
    var params = app.Http.buildParams()
    app.Http.request('deliveryTimeType/gets.do', params, function (res) {
      if (res) {
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
        isGetDeliveryTimeType = true;
      }
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
  //获取运费方案
  getFreightPlan() {
    var that = this;
    var params = app.Http.buildParams()
    app.Http.request('freightPlan/getDefault.do', params, function (res) {
      if (res) {
        var freight = 0;
        var freightPlan = res.data;
        var basicFreight = freightPlan.basicFreight;//基础运费
        var freeFreightAmount = freightPlan.freeFreightAmount;//免运费金额
        var totalAmount = that.data.goodsOrder.totalAmount;//商品总金额

        that.setData({
          "goodsOrder.freightAmount": totalAmount >= freeFreightAmount ? 0 : basicFreight
        })
        that.calculatePaymentAmount();
        isGetFreightPlane = true;
      }
    })
  },
  //填写备注
  handleFiilInRemark(e) {
    this.setData({
      "goodsOrder.remark": e.detail.value
    })
  },
  //计算总金额
  calculatePaymentAmount() {
    var goodsOrder = this.data.goodsOrder;
    var amount1 = app.Count.decimalAdd(goodsOrder.totalAmount, goodsOrder.freightAmount, 6);
    var paymentAmount = app.Count.decimalAdd(amount1, goodsOrder.deliveryTimeTypeSurcharge, 2);

    this.setData({
      "goodsOrder.paymentAmount": paymentAmount
    })
  },
  saveOrder() {
    //成功获取送货时间和运费方案才能下单
    if (isGetDeliveryTimeType && isGetFreightPlane) {
      var goodsOrder = this.data.goodsOrder;

      //TODO
      console.log(goodsOrder)
      console.log(JSON.stringify(goodsOrder))
    } else {
      wx.showModal({
        title: '无法下单',
        confirmColor: '#20a0ff',
        content: app.Constants.requestFailTip,
        showCancel: false
      })
    }
  }
})