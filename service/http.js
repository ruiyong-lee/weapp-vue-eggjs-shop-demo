// 请求

//mock测试域名
var root = 'https://www.easy-mock.com/mock/5975a13da1d30433d83b8d9c/shop/';

//本地测试域名
// var root = 'http://localhost:8078/ghps-controller/';

function buildParams(url, data, cb) {
  var params = {};
  // params.platform = this.PLATFORM;
  // params.sessionId = this.getCookieValue(this.SESSION_ID_KEY);
  // params.userIdentity = this.USER_IDENTITY;
  // params.userUuid = this.getCookieValue(this.USER_UUID_KEY);
  // params.userName = this.getCookieValue(this.USER_NAME_KEY);
  params.body = {};
  return params;
}

function request(url, data, cb) {
  wx.request({
    method: 'POST',
    url: root + url,
    data: data,
    success: function (res) {
      //TODO
      var info = res.data;
      return typeof cb == "function" && cb(info.data ? info : false)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

module.exports = {
  buildParams: buildParams,
  request: request,
}