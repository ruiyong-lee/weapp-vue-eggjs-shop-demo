// pages/cart/cart.js
var ZanQuantity = require('../../style/zanui/quantity/index')//引入数字输入控件
var app = getApp();

Page(Object.assign({}, ZanQuantity, {
  data: {
    cartStorage: {},
    cartCheckStorage: {},
    isEdit: false,
    cartEmpty: true,
    checkAll: false,
    zanQuantityConfig: {
      min: 1,
      max: 9999,
    }
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '购物车'
    })
  },
  onShow() {
    var cartStorage = app.Storage.getStorageSync('cart', app.Constants.getCartFailTip);
    var cartCheckStorage = app.Storage.getStorageSync('cart-check', app.Constants.getCartFailTip);
    var cartKeys = Object.keys(cartStorage);
    var cartCheckMap = {};//勾选

    if (app.Check.isUndeFinedOrNullOrEmpty(cartCheckStorage)) {
      for (var i in cartKeys) {
        cartCheckMap[cartKeys[i]] = false;
      }
      app.Storage.setStorageSync('cart-check', cartCheckMap, app.Constants.addToCartFailTip)
    }

    this.setData({
      cartStorage: cartStorage,
      cartCheckStorage: cartCheckMap,
      cartEmpty: app.Check.isUndeFinedOrNullOrEmpty(cartStorage)
    })
  },

  //全选、取消全选
  toggleCheckAll() {
    this.setData({
      checkAll: !this.data.checkAll
    })
  },
  //选中单条
  toggleCheckItem() {
    //TODO
    this.setData({
      checkAll: !this.data.checkAll
    })
  },
  //切换编辑、完成
  toggleIsEdit() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  //数量改变
  handleZanQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;

    this.setData({
      [`cartStorage.${componentId}.goodsQty`]: quantity
    });

    app.Storage.setStorageSync('cart', this.data.cartStorage, app.Constants.addToCartFailTip)
  },

}))