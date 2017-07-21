// pages/cart/cart.js
Page({
  data: {
    cartEmpty: false,
  },

  // 跳转到首页
  switchTabIndex() {
    wx.switchTab({
      url: '../index/index'
    })
  }
})