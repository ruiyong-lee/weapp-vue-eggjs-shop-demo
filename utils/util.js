//工具类方法

//format相关方法
var Format = {
  formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  },
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
}

//验证相关方法
var Check = {
  isUndeFinedOrNull(obj) {
    return obj == undefined || obj == null;
  },
  isUndeFinedOrNullOrBlank(str) {
    return this.isUndeFinedOrNull(str) || (typeof str === 'string' && str.trim() == "");
  },
  isUndeFinedOrNullOrEmpty(obj) {
    return this.isUndeFinedOrNullOrBlank(obj) || JSON.stringify(obj) === '{}';
  },
}

//数据缓存相关方法
var Storage = {
  setStorageSync(key, value, msg) {
    try {
      wx.setStorageSync(key, value)
    } catch (e) {
      wx.showModal({ title: '提示', content: msg, showCancel: false })
    }
  },
  getStorageSync(key, msg) {
    try {
      var value = wx.getStorageSync(key)
      if (value) {
        return value
      }
    } catch (e) {
      wx.showModal({ title: '提示', content: msg, showCancel: false })
    }
  },
  removeStorageSync(key, msg) {
    try {
      wx.removeStorageSync(key)
    } catch (e) {
      wx.showModal({ title: '提示', content: msg, showCancel: false })
    }
  },
  clearStorageSync(key, msg) {
    try {
      wx.clearStorageSync(key)
    } catch (e) {
      wx.showModal({ title: '提示', content: msg, showCancel: false })
    }
  },
}

module.exports = {
  Format: Format,
  Check: Check,
  Storage: Storage,
}
