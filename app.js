//app.js

var Http = require('service/http.js');

App({
  onLaunch: function (options) {

  },
  onShow: function (options) {

  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },

  // 请求
  Http: Http,

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

  globalData: {
    userInfo: null
  }
})
