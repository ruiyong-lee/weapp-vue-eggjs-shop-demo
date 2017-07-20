// pages/orderDetail/orderDetail.js

Page({
  data: {
    timeArr: ['次日达（次日20点之前）', '加急当日达（当日20点之前）']
  },
  chooseDay: function () {
    var that = this;
    var list = that.data.timeArr;
    wx.showActionSheet({
      itemList: list,
      success: function (res) {
        if (!res.cancel) {
          console.log(list[res.tapIndex])
        }
      }
    });
  }
})