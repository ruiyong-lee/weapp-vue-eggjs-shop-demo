// pages/person/person.js
//获取应用实例
var app = getApp()

Page({
  data: {
    address: undefined
  },
  data: {
    userInfo: {}
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
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