// pages/cart/cart.js

var app = getApp();

Page({
  data: {
    cartEmpty: false,
  },

  onReady() {
    var params = app.http.buildParams()
    app.http.request('goods/query.do', params, function(res) {
      console.log(res)
    })
  },

  // 跳转到首页
  switchTabIndex() {
    wx.switchTab({
      url: '../index/index'
    })
  }
})