//logs.js
var Util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return Util.Format.formatTime(new Date(log))
      })
    })
  }
})
