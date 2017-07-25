// pages/cart/cart.js

var App = getApp();

Page({
  data: {
    cartEmpty: false,
  },

  onReady() {
    var params = App.Http.buildParams()
    App.Http.request('goods/getDropDownGoods.do', params, function(res) {
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