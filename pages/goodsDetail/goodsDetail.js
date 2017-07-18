//goodsDetail.js
var cartAdd = require('../../style/ui/cart-add/index');//引入数字输入控件
//获取应用实例
var app = getApp()
Page(Object.assign({}, cartAdd, {
  data: {
    cartData: {
      quantity: 1,
      min: 1,
      max: 9999,
      showDialog: false
    },
    imgUrls: [
      
    ],
  },
  //数量改变
  handleZanQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;

    //数据处理 TODO
    this.setData({
      [`${componentId}.quantity`]: quantity
    });
  },
  //打开关闭添加到购物车按钮
  toggleDialog() {
    this.setData({
      ["cartData.showDialog"]: !this.data.cartData.showDialog
    });
  },
}))
