// pages/addressEdit/addressEdit.js
Page({
  data: {
    address: {
      linkMan: '',
      linkPhone: '',
      shopName: '',
      address: ''
    }
  },

  onLoad(option) {
    var isAdd = option.isAdd;

    wx.setNavigationBarTitle({
      title: '地址修改'
    })

    if(isAdd) {
      
    }
  },

  handleInputChange(e) {
    console.log(e.detail)
  },
  saveAddress() {
    //TODO
  }
})