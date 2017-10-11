// pages/addressEdit/addressEdit.js
var app = getApp();

Page({
  data: {
    address: {
      linkMan: '',
      linkPhone: '',
      shopName: '',
      address: '',
      sysDefault: false
    },
    check: {
      linkMan: true,
      linkPhone: true,
      address: true
    }
  },

  onLoad(option) {
    var isAdd = option.isAdd;
    var addressUuid = option.uuid;

    wx.setNavigationBarTitle({
      title: isAdd ? '新增地址' : '地址修改'
    })

    if (addressUuid) {
      this.getAddress(addressUuid)
    }
  },

  getAddress(addressUuid) {
    var that = this;
    var params = app.Http.buildParams()
    params.body.uuid = addressUuid

    app.Http.request('getAddressByUuid.do', params, function (res) {
      that.setData({
        address: JSON.parse(res)
      })
    })
  },
  //input失焦
  handleInputBlur(e) {
    var key = e.currentTarget.dataset.key
    var value = e.detail.value

    this.setData({
      [`address.${key}`]: value
    })
    this.checkAllInfo(key, value)
  },
  //input填写时
  handleInputChange(e) {
    var key = e.currentTarget.dataset.key
    var value = e.detail.value

    this.checkAllInfo(key, value)
  },
  switchChange(e) {
    this.setData({
      'address.sysDefault': e.detail.value
    })
  },
  saveAddress() {
    var that = this;
    var address = that.data.address
    var params = app.Http.buildParams()
    params.body.address = address
    console.log(params)

    if (this.getValidToSave()) {
      if (address.uuid) {
        this.saveModifyAddress(params)
      } else {
        this.saveNewAddress(params)
      }
    }
  },
  //保存新增地址
  saveNewAddress(params) {
    var that = this;

    if (this.getValidToSave()) {
      app.Http.request('saveNewAddress.do', params, function (res) {
        wx.showToast({ title: '新建成功', icon: 'success', duration: 2000 })
        that.navigateBack()
      })
    }
  },
  //保存编辑地址
  saveModifyAddress(params) {
    var that = this;

    if (this.getValidToSave()) {
      app.Http.request('saveModifyAddress.do', params, function (res) {
        wx.showToast({ title: '修改成功', icon: 'success', duration: 2000 })
        that.navigateBack()
      })
    }
  },
  //检测字段
  checkAllInfo(key, value) {
    var valid;
    if (key === 'linkPhone') {
      valid = this.checkPhone(key, value)
    } else {
      valid = this.checkOtherInfo(key, value)
    }
    return valid
  },
  //检测联系方式之外的其他必填字段
  checkOtherInfo(key, value) {
    var valid = true
    if (String(this.data.check[key])) {
      var valid = value ? true : false
      this.setData({
        [`check.${key}`]: valid
      })
    }
    return valid
  },
  //检测联系方式之外的其他必填字段
  checkPhone(key, value) {
    var regex = new RegExp(app.Constants.TELEPHONE_CELLPHONE_REGEX)
    var validPhone = regex.test(value)
    this.setData({
      'check.linkPhone': validPhone
    })
    return validPhone
  },
  //验证是否可以保存
  getValidToSave() {
    var valid = true;
    var address = this.data.address;
    var check = this.data.check;

    for (var key in check) {
      var value = address[key]
      valid &= this.checkAllInfo(key, value)
    }
    return valid
  },
  navigateBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})