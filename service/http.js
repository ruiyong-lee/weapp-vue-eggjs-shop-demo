// 请求

var app = getApp();
var Constants = require('../utils/constants.js')//引入constants.js

//mock测试域名
// var root = 'https://www.easy-mock.com/mock/5975a13da1d30433d83b8d9c/shop/';

//本地测试域名
var root = 'http://localhost:8098/ghps-controller/ghps/wechat/';

function buildParams(url, data, cb) {
  var app = getApp();
  var userInfo = app.globalData.userInfo
  var params = {}
  params.platform = Constants.PLATFORM
  params.userIdentity = Constants.USER_IDENTITY
  params.appid = 'wxd5f43aeb67cd5192'
  params.nickName = userInfo ? userInfo.nickName : ''
  params.body = {}
  return params
}


function buildFilter(arg) {
  var filter = {}
  arg = arg || {}
  filter.params = arg.params || {}
  filter.orders = arg.orders || []
  filter.page = arg.page || 0
  filter.pageSize = arg.pageSize || 5
  filter.defaultPageSize = arg.defaultPageSize || 0
  return filter
}

function request(url, data, cb) {
  var session_id = wx.getStorageSync('3rd_session')
  var header = session_id ? { 'content-type': 'application/json', 'Cookie': 'JSESSIONID=' + session_id } : { 'content-type': 'application/json' };

  console.log(data)
  wx.request({
    method: 'POST',
    url: root + url,
    data: data,
    header: header,
    success: function (res) {
      var info = res.data; console.log(res)
      if (info.errorCode == 0) {
        return typeof cb === "function" && cb(info.data || null)
      } else if (info.errorCode == 5) {
        //未登录或过期
        login(function() {
          request(url, data, cb)
        })
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

function login(cb) {
  var params = buildParams()

  wx.setStorageSync('3rd_session', '')
  wx.login({
    success: function (res) {
      var code = res.code;
      if (code) {
        params.body.js_code = code;
        request('login.do', params, function (res1) {
          wx.setStorageSync('3rd_session', res1)
          return typeof cb === "function" && cb()
        })
      } else {
        wx.showModal({
          title: '获取用户登录态失败',
          content: 'res.errMsg',
          showCancel: false
        })
      }
    }
  });
}

module.exports = {
  buildFilter: buildFilter,
  buildParams: buildParams,
  request: request,
  login: login
}