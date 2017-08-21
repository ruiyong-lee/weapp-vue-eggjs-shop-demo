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
  formatCountDown(interval) {
    var maxInterval = 1800000 //不超过30分钟
    var surplus = maxInterval - interval
    var minute = parseInt(surplus / 60000, 10)
    var seconds = Math.ceil((surplus % 60000) / 1000)

    return surplus >= 0 ? minute + '分' + seconds + '秒' : false
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

//数字计算相关方法
var Count = {
  //四舍五入到num后面的n位
  round(num, n) {
    return Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
  },
  /**
   * 带小数数字的加法运算
   * @param arg1 加数1
   * @param arg2 加数2
   * @param fractionalDigits 保留的小数位数
   */
  decimalAdd(arg1, arg2, fractionalDigits) {
    arg1 = Check.isUndeFinedOrNullOrBlank(arg1) ? 0.0 : arg1;
    arg2 = Check.isUndeFinedOrNullOrBlank(arg2) ? 0.0 : arg2;
    fractionalDigits = Check.isUndeFinedOrNullOrBlank(fractionalDigits) ? 0 : fractionalDigits;

    return this.round(Number(arg1) + Number(arg2), fractionalDigits);
  },
  /**
   * 带小数数字的减法运算
   * @param arg1 减数1
   * @param arg2 减数2
   * @param fractionalDigits 保留的小数位数
   */
  decimalSubtract(arg1, arg2, fractionalDigits) {
    arg1 = Check.isUndeFinedOrNullOrBlank(arg1) ? 0.0 : arg1;
    arg2 = Check.isUndeFinedOrNullOrBlank(arg2) ? 0.0 : arg2;
    fractionalDigits = Check.isUndeFinedOrNullOrBlank(fractionalDigits) ? 0 : fractionalDigits;

    return this.round(Number(arg1) - Number(arg2), fractionalDigits);
  },
  /**
   * 带小数数字的乘法运算
   * @param arg1 乘数1
   * @param arg2 乘数2
   * @param fractionalDigits 保留的小数位数
   */
  decimalMultiply(arg1, arg2, fractionalDigits) {
    arg1 = Check.isUndeFinedOrNullOrBlank(arg1) ? 0.0 : arg1;
    arg2 = Check.isUndeFinedOrNullOrBlank(arg2) ? 0.0 : arg2;
    fractionalDigits = Check.isUndeFinedOrNullOrBlank(fractionalDigits) ? 0 : fractionalDigits;

    return this.round(Number(arg1) * Number(arg2), fractionalDigits);
  },
  /**
   * @param arg1 被除数
   * @param arg2 除数
   * @param fractionalDigits 保留小数位数
   */
  decimalDivide(arg1, arg2, fractionalDigits) {
    arg1 = Check.isUndeFinedOrNullOrBlank(arg1) ? 0.0 : arg1;
    arg2 = Check.isUndeFinedOrNullOrBlank(arg2) ? 1.0 : arg2;
    fractionalDigits = Check.isUndeFinedOrNullOrBlank(fractionalDigits) ? 0 : fractionalDigits;

    return this.round(arg1 / arg2, fractionalDigits);
  },
}

//数据缓存相关方法
var Storage = {
  setStorageSync(key, value, msg) {
    msg = msg || '无法缓存数据'
    try {
      wx.setStorageSync(key, value)
    } catch (e) {
      wx.showModal({ title: '提示', confirmColor: '#20a0ff', content: msg, showCancel: false })
    }
  },
  getStorageSync(key, msg) {
    msg = msg || '无法获取缓存数据'
    try {
      var value = wx.getStorageSync(key)
      if (value) {
        return value
      }
    } catch (e) {
      wx.showModal({ title: '提示', confirmColor: '#20a0ff', content: msg, showCancel: false })
    }
  },
  removeStorageSync(key, msg) {
    msg = msg || '无法移除缓存数据'
    try {
      wx.removeStorageSync(key)
    } catch (e) {
      wx.showModal({ title: '提示', confirmColor: '#20a0ff', content: msg, showCancel: false })
    }
  },
  clearStorageSync(key, msg) {
    msg = msg || '无法清除缓存数据'
    try {
      wx.clearStorageSync(key)
    } catch (e) {
      wx.showModal({ title: '提示', confirmColor: '#20a0ff', content: msg, showCancel: false })
    }
  },
}

module.exports = {
  Format: Format,
  Check: Check,
  Count: Count,
  Storage: Storage,
}
