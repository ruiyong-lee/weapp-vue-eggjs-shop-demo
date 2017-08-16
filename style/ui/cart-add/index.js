var ZanQuantity = require('../../zanui/quantity/index')//引入数字输入控件
var ZanToast = require('../../zanui/toast/index');//引入消息提示框控件

var app = getApp();//获取应用实例

var cartAdd = Object.assign({}, ZanQuantity, ZanToast, {
  //添加到购物车
  addToCart(e) {
    var dataset = e.currentTarget.dataset;
    var cartData = dataset.cartData;
    var key = cartData.goods.uuid;
    var cartStorage = app.Storage.getStorageSync('cart', app.Constants.getCartFailTip);
    var cartItem = this.getCartItem(cartData);

    this.setData({
      "cartData.showDialog": false
    });

    if (app.Check.isUndeFinedOrNullOrEmpty(cartStorage)) {
      app.Storage.setStorageSync('cart', { [key]: cartItem }, app.Constants.addToCartFailTip)
    } else {
      cartStorage[key] = cartItem;
      app.Storage.setStorageSync('cart', cartStorage, app.Constants.addToCartFailTip)
    }
    this.setData({
      isCartEmpty: false
    });
    this.showZanToast('已成功添加到购物车');
  },
  //通过cartData构建一条购物车数据
  getCartItem(data) {
    var result = {};
    var goodsInfo = data.goods;

    result.goods = goodsInfo.goods;
    result.unitName = goodsInfo.unitName;
    result.goodsPic = goodsInfo.mainImg;
    result.goodsSpec = goodsInfo.spec;
    result.goodsCategory = goodsInfo.categoryUuid;
    result.salePrice = goodsInfo.salePrice;
    result.goodsQty = data.quantity;
    result.remark = data.remark;
    result.hasReturnQty = 0;

    return result;
  },
  //数量改变
  handleZanQuantityChange(e) {
    var quantity = e.quantity;

    this.setData({
      "cartData.quantity": quantity
    });
  },
  //修改备注
  bindKeyInput(e) {
    this.setData({
      "cartData.remark": e.detail.value
    })
  }
})

module.exports = cartAdd;