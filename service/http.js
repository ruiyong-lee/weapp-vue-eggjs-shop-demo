// 请求

var Constants = require('../utils/constants.js')//引入constants.js

//mock测试域名
// var root = 'https://www.easy-mock.com/mock/5975a13da1d30433d83b8d9c/shop/';

//本地测试域名
var root = 'http://localhost:8098/ghps-controller/ghps/wechat/';

function buildParams(url, data, cb) {
  var params = {};
  params.platform = Constants.PLATFORM;
  params.userIdentity = Constants.USER_IDENTITY;
  params.appid = 'wxd5f43aeb67cd5192';
  // params.sessionId = this.getCookieValue(this.SESSION_ID_KEY);
  // params.userUuid = this.getCookieValue(this.USER_UUID_KEY);
  // params.userName = this.getCookieValue(this.USER_NAME_KEY);
  params.body = {};
  return params;
}

function request(url, data, cb) {
  var session_id = wx.getStorageSync('3rd_session')
  var header = session_id ? { 'content-type': 'application/json', 'Cookie': 'JSESSIONID=' + session_id } : { 'content-type': 'application/json' };

  wx.request({
    method: 'POST',
    url: root + url,
    data: data,
    header: header,
    success: function (res) {
      var info = res.data;
      if (info.errorCode == 0) {
        return typeof cb === "function" && cb(info.data || null)
      } else if (info.errorCode == 100) {
        //TODO 尚未登录
      } else {
        wx.showModal({
          title: '提示',
          content: info.message,
          showCancel: false
        })
      }
    },
    fail: function () {
      wx.showModal({
        title: '提示',
        content: '网络异常',
        showCancel: false
      })
    }
  })
}

module.exports = {
  buildParams: buildParams,
  request: request,
}