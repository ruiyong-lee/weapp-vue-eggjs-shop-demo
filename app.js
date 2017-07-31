//app.js

var Http = require('service/http.js');
var Util = require('utils/util.js');//引入util.js
var Constants = require('utils/constants.js')//引入constants.js
var Check = Util.Check;//验证
var Count = Util.Count;//验证
var Storage = Util.Storage;//数据缓存

App({
  onReady: function (options) {

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
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          console.log(res)
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  jumpTo(url) {
    wx.navigateTo({
      url: url,
    })
  },
  setSelectedGoods(goods) {
    this.globalData.selectedGoods = goods
  },
  isCartEmpty() {
    var cartStorage = Storage.getStorageSync('cart', Constants.getCartFailTip);
    return Check.isUndeFinedOrNullOrEmpty(cartStorage);
  },

  globalData: {
    userInfo: null,
    selectedGoods: {}
  }
})
