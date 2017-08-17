//app.js

var Http = require('service/http.js');
var Util = require('utils/util.js');//引入util.js
var Constants = require('utils/constants.js')//引入constants.js
var Check = Util.Check;//验证
var Count = Util.Count;//验证
var Storage = Util.Storage;//数据缓存

App({
  onLaunch: function (options) {
    var that = this;
    var session_id = wx.getStorageSync('3rd_session')

    // that.login()
    // if (session_id) {
    //   wx.checkSession({
    //     success: function () {
    //       //session 未过期，并且在本生命周期一直有效
    //     },
    //     fail: function () {
    //       //登录态过期
    //       that.login()
    //     }
    //   })
    // } else {
    //   that.login()
    // }
  },
  onError: function (msg) {
    console.log(msg)
  },

  //引入
  Constants: Constants,
  Http: Http,
  Check: Check,
  Count: Count,
  Storage: Storage,

  //公用方法
  getUserInfo(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
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
    this.globalData.selectedGoods = goods
  },
  //订单信息，用于订单详情页
  setGoodsOrder(goodsOrder) {
    this.globalData.goodsOrder = goodsOrder
  },
  //判断购物车是否为空
  isCartEmpty() {
    var cartStorage = Storage.getStorageSync('cart', Constants.getCartFailTip);
    return Check.isUndeFinedOrNullOrEmpty(cartStorage);
  },

  globalData: {
    userInfo: null,
    selectedGoods: {},
    goodsOrder: {}
  }
})
