// pages/authorize/authorize.js
var app = getApp()

Page({
  bindGetUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})