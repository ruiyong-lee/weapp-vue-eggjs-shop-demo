// pages/person/person.js
//获取应用实例
var app = getApp()

Page({
  data: {
    address: undefined,
    userInfo: {}
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  callCustomer() {
    wx.makePhoneCall({
      phoneNumber: '18359197148' //仅为示例，TODO
    })
  },
  geiAddress() {
    var that = this;
    
    wx.chooseAddress({
      success: function (res) {
        //仅为示例，TODO
      }
    })
  }
})