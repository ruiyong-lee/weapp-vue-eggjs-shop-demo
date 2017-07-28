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

module.exports = {
  Format: Format,
  Check: Check
}
