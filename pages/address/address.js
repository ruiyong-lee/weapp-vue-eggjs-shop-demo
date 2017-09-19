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
    var addressUuid = option.addressUuid;
    var addressStorage = app.Storage.getStorageSync('address-selected', app.Constants.getCheckFailTip);

    wx.setNavigationBarTitle({
      title: status === 'select' ? '选择地址' : '我的地址'
    })
    this.setData({
      status: status,
      selectedAddressUuid: addressStorage ? addressStorage.uuid : addressUuid || ''
    })
  },
  onShow() {
    this.getAddressList()
  },

  //获取地址列表
  getAddressList() {
    var that = this;
    var params = app.Http.buildParams()
    app.Http.request('getAddressList.json', params, function (res) {
      var addressList = JSON.parse(res);console.log(addressList)
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
  },
  //设为默认地址
  setDefaultAddress(e) {
    var that = this;
    var params = app.Http.buildParams()
    params.body.uuid = e.currentTarget.dataset.uuid;
    app.Http.request('setDefaultAddress.json', params, function (res) {
      wx.showToast({ title: '设置默认地址成功', icon: 'success', duration: 2000 })
      that.getAddressList();
    })
  },
  //删除地址
  deleteAddress(e) {
    var that = this;

    wx.showModal({
      title: '提示',
      content: '确认删除该地址？',
      success: function (res) {
        if (res.confirm) {
          var params = app.Http.buildParams()
          params.body.uuid = e.currentTarget.dataset.uuid;
          app.Http.request('deleteAddress.json', params, function (res) {
            wx.showToast({ title: '删除成功', icon: 'success', duration: 2000 })
            that.getAddressList();
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})