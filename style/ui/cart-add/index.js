var ZanQuantity = require('../../zanui/quantity/index')//引入数字输入控件
var ZanToast = require('../../zanui/toast/index');
var Util = require('../../../utils/util.js')//引入util.js
var Check = Util.Check;

var cartAdd = Object.assign({}, ZanQuantity, ZanToast, {
  //添加到购物车
  addToCart(e) {
    var dataset = e.currentTarget.dataset;
    var cartData = dataset.cartData;
    var key = cartData.goods.uuid;
    var cartStorage = wx.getStorageSync('cart-storage');
    var cartItem = this.getCartItem(cartData);

    if (Check.isUndeFinedOrNullOrEmpty(cartStorage)) {
      wx.setStorageSync('cart-storage', { [key]: cartItem });
    } else {
      cartStorage[key] = cartItem;
      wx.setStorageSync('cart-storage', cartStorage);
    }
    //TODO 设置失败的情况
    this.setData({
      "cartData.showDialog": false
    });
    this.showZanToast('已成功添加到购物车');
  },
  //通过cartData构建一条购物车数据
  getCartItem(data) {
    var result = {};
    var goodsInfo = data.goods;

    result.goods = goodsInfo.goods;
    result.unitName = goodsInfo.unitName;
    result.goodsPic = goodsInfo.thumbnail;
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