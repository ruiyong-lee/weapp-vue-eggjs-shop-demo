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

  //获取用户授权情况
  getSetting() {
    var that = this;
    wx.getSetting({
      success(res) {
        wx.openSetting({
          success(res2) {
            if (res2.authSetting['scope.userInfo']) {
              that.getUserInfo();
            } else {
              app.globalData.userInfo = {}
              that.setData({
                userInfo: {}
              })
            }
          },
        })
      }
    })
  },
  //获取用户信息
  getUserInfo() {
    var that = this;
    var userInfo = app.globalData.userInfo;

    app.getUserInfo(function (result) {
      that.setData({
        userInfo: result
      })
    });
  },
  //联系客服
  callCustomer() {
    wx.makePhoneCall({
      phoneNumber: app.Constants.servicePhone
    })
  },
})