// pages/address/address.js

var app = getApp();

Page({
  data: {
    status: '',
    addressList: [],
    selectedAddressUuid: ''
  },

  onLoad(option) {
    var status = option.status;
    var addressStorage = app.Storage.getStorageSync('address-selected', app.Constants.getCheckFailTip);

    wx.setNavigationBarTitle({
      title: status === 'select' ? '选择地址' : '我的地址'
    })
    this.setData({
      status: status,
      selectedAddressUuid: addressStorage ? addressStorage.uuid : ''
    })
    this.getAddressList();
  },

  //获取地址列表
  getAddressList() {
    var that = this;
    var params = app.Http.buildParams()
    app.Http.request('getAddressList.do', params, function (res) {
      var addressList = JSON.parse(res)
      that.setData({
        addressList: addressList
      })
    })
  },
  //选择地址
  handleSelectAddress(e) {
    if (this.data.status === 'select') {
      var address = e.currentTarget.dataset.address;

      app.Storage.setStorageSync('address-selected', address, app.Constants.saveCheckFailTip)
      wx.navigateBack()
    }
  }
})