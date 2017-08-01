//goodsDetail.js
var cartAdd = require('../../style/ui/cart-add/index');//引入数字输入控件
var app = getApp();//获取应用实例

Page(Object.assign({}, cartAdd, {
  data: {
    cartData: {
      quantity: 1,
      remark: '',
      min: 1,
      max: 9999,
      showDialog: false
    },
    goods: {},
    isCartEmpty: true
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: '商品详情'
    })
  },
  onReady() {
    this.setData({
      goods: app.globalData.selectedGoods,
      isCartEmpty: app.isCartEmpty()
    });
  },

  //打开关闭添加到购物车按钮
  toggleDialog() {
    var showDialog = this.data.cartData.showDialog;
    var goods = this.data.goods;

    this.setData({
      "cartData.showDialog": !showDialog,
      "cartData.goods": !showDialog ? goods : {},
      "cartData.quantity": 1,
      "cartData.remark": '',
    });
  },
}))
