//app.js

var Http = require('service/http.js');
var Util = require('utils/util.js');//引入util.js
var Constants = require('utils/constants.js')//引入constants.js
var Check = Util.Check;//验证相关方法
var Count = Util.Count;//计算相关方法
var Format = Util.Format;//format相关方法
var Storage = Util.Storage;//数据缓存

App({
  onLaunch: function (options) {
    this.getUserInfo();
  },
  onShow: function (options) {
    this.globalData.isReloadGoods = true;
  },
  onError: function (msg) {
    console.log(msg);
  },

  //引入
  Constants: Constants,
  Http: Http,
  Check: Check,
  Count: Count,
  Format: Format,
  Storage: Storage,

  //公用方法
  getUserInfo(cb) {
    var that = this;
    if (!Check.isUndeFinedOrNullOrEmpty(this.globalData.userInfo)) {
      return typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo;
          return typeof cb == "function" && cb(that.globalData.userInfo);
        }
      })
    }
  },
  //跳转
  jumpTo(url) {
    wx.navigateTo({
      url: url,
    })
  },
  //已选商品，用于商品详情页
  setSelectedGoods(goods) {
    this.globalData.selectedGoods = goods;
  },
  //订单信息，用于订单详情页
  setGoodsOrder(goodsOrder) {
    this.globalData.goodsOrder = goodsOrder;
  },
  //判断购物车是否为空
  isCartEmpty() {
    var cartStorage = Storage.getStorageSync('cart', Constants.getCartFailTip);
    return Check.isUndeFinedOrNullOrEmpty(cartStorage);
  },
  //清空购物车
  clearCart() {
    Storage.removeStorageSync('cart');
    Storage.removeStorageSync('cart-check');
  },
  //再次购买，覆盖商品最新信息
  orderAgain(orderLines) {
    var goodsMap = this.globalData.goodsMap;
    var cartStorage = Storage.getStorageSync('cart', this.Constants.getCartFailTip) || {};
    var cartCheckStorage = Storage.getStorageSync('cart-check', this.Constants.getCheckFailTip) || {};

    for (var i = 0; i < orderLines.length; i++) {
      var item = orderLines[i];
      var key = item.goods.uuid;
      var goods = goodsMap[key];
      //只有数目、备注和原订单一样，其他的获取最新数据
      var cartItem = {
        goods: goods.goods,
        unitName: goods.unitName,
        goodsPic: goods.mainImg,
        salePrice: goods.salePrice,
        goodsQty: item.goodsQty,
        remark: item.goodsQty,
        hasReturnQty: 0
      };
      cartStorage[key] = cartItem;
      cartCheckStorage[key] = true;
    }

    Storage.setStorageSync('cart', cartStorage, this.Constants.addToCartFailTip);
    Storage.setStorageSync('cart-check', cartCheckStorage, this.Constants.saveCheckFailTip);

    wx.switchTab({
      url: '../cart/cart'
    })
  },
  //取消订单
  cancelOrderBill(order, cb) {
    wx.showModal({
      title: '提示',
      content: '狠心取消订单？',
      success: function (res) {
        if (res.confirm) {
          var params = Http.buildParams()
          params.body = {
            uuid: order.uuid,
            version: order.version
          }
          Http.request('cancelOrderBill.do', params, function () {
            wx.showToast({ title: '取消订单成功', icon: 'success', duration: 2000 })
            return typeof cb == "function" && cb();
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //确认收货
  completeOrderBill(order, cb) {
    wx.showModal({
      title: '提示',
      content: '确认已收到货品？',
      success: function (res) {
        if (res.confirm) {
          var params = Http.buildParams()
          params.body = {
            uuid: order.uuid,
            version: order.version
          }
          Http.request('completeOrderBill.do', params, function () {
            wx.showToast({ title: '确认收货成功', icon: 'success', duration: 2000 })
            return typeof cb == "function" && cb();
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    selectedGoods: {},
    goodsOrder: {},
    goodsMap: {},
    isReloadGoods: true,
    downGoodsQty: 0
  }
})
