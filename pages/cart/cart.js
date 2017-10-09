// pages/cart/cart.js
var ZanQuantity = require('../../style/zanui/quantity/index')//引入数字输入控件
var ZanTopTips = require('../../style/zanui/toptips/index')//引入提示控件
var app = getApp();

Page(Object.assign({}, ZanQuantity, ZanTopTips, {
  data: {
    cartStorage: {},
    cartCheckMap: {},
    isEdit: false,
    cartEmpty: false,
    checkAll: false,
    goodsOrder: {
      orgUuid: '',
      status: 'initial',
      type: 'wechat',
      customer: {},
      goodsTotalQty: 0,
      totalAmount: 0,
      freightAmount: 0,
      reductionAmount: 0,
      paymentAmount: 0,
      addressUuid: '',
      linkman: '',
      linkPhone: '',
      shopName: '',
      address: '',
      deliveryTimeTypeUuid: '',
      deliveryTimeTypeName: '',
      deliveryTimeTypeRemark: '',
      deliveryTimeTypeSurcharge: 0,
      remark: 0,
      lines: [],
    },
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
    var cartCheckStorage = app.Storage.getStorageSync('cart-check', app.Constants.getCheckFailTip);

    this.setData({
      cartStorage: cartStorage ? cartStorage : {},
      cartCheckMap: cartCheckStorage ? cartCheckStorage : {},
      cartEmpty: app.Check.isUndeFinedOrNullOrEmpty(cartStorage),
      isEdit: false
    })
    this.handleCheckItem();
  },

  //全选、取消全选
  toggleCheckAll() {
    var isEdit = this.data.isEdit;
    var checked = this.data.checkAll;
    var cartStorage = this.data.cartStorage;
    var cartCheckMap = {};//勾选
    var hasOneUpGoodsAtLeast = false;//至少有一个上架的商品

    if (!checked) {
      for (var key in cartStorage) {
        if (!cartStorage[key].isDown || isEdit) {
          cartCheckMap[key] = true
          hasOneUpGoodsAtLeast = true
        }
      }
    }

    this.setData({
      checkAll: hasOneUpGoodsAtLeast && !checked,
      cartCheckMap: cartCheckMap
    })
    this.calculateAmount();
    this.setCartCheckStorage(cartCheckMap);
  },
  //选中单条
  toggleCheckItem(e) {
    var dataset = e.currentTarget.dataset;
    var key = dataset.key;
    var isEdit = this.data.isEdit;
    var cartStorage = this.data.cartStorage;
    var cartCheckMap = this.data.cartCheckMap;
    var checked = cartCheckMap[key];

    if (!cartStorage[key].isDown || isEdit) {
      if (checked) {
        delete cartCheckMap[key];
      } else {
        cartCheckMap[key] = true;
      }

      this.setData({
        cartCheckMap: cartCheckMap
      })
      this.handleCheckItem();
      this.setCartCheckStorage(cartCheckMap);
    }
  },
  //选中单条时判断是否全选、计算价格
  handleCheckItem() {
    var cartStorage = this.data.cartStorage;
    var cartCheckMap = this.data.cartCheckMap;
    var total = Object.keys(cartStorage).length;
    var checkedNum = Object.keys(cartCheckMap).length;

    this.calculateAmount();
    this.setData({
      checkAll: total - app.globalData.downGoodsQty === checkedNum && total !== 0 ? true : false
    })
  },
  //计算总额、总数
  calculateAmount() {
    var totalAmount = 0;//总额
    var goodsTotalQty = 0;//总数
    var cartStorage = this.data.cartStorage;
    var cartCheckMap = this.data.cartCheckMap;

    for (var key in cartCheckMap) {
      var item = cartStorage[key];
      var singlrPrice = app.Count.decimalMultiply(item.salePrice, item.goodsQty, 6);
      goodsTotalQty = app.Count.decimalAdd(goodsTotalQty, item.goodsQty, 6);
      totalAmount = app.Count.decimalAdd(totalAmount, singlrPrice, 2);
    }

    this.setData({
      'goodsOrder.goodsTotalQty': goodsTotalQty,
      'goodsOrder.totalAmount': totalAmount
    })
  },
  //切换编辑、完成
  toggleIsEdit() {
    var isEdit = this.data.isEdit;
    var cartCheckStorage = app.Storage.getStorageSync('cart-check', app.Constants.getCheckFailTip);

    if (isEdit) {
      this.setData({
        cartCheckMap: cartCheckStorage || {},
      })
      this.handleCheckItem();
    } else {
      this.setData({
        cartCheckMap: {},
        checkAll: false
      })
    }

    this.setData({
      isEdit: !isEdit
    })
  },
  //勾选时缓存
  setCartCheckStorage(data, valid) {
    if (!this.data.isEdit || valid) {
      app.Storage.setStorageSync('cart-check', data, app.Constants.saveCheckFailTip)
    }
  },
  //从购物车删除选中项
  deleteCartItem() {
    var that = this;
    var cartStorage = this.data.cartStorage;
    var cartCheckMap = this.data.cartCheckMap;
    var cartCheckStorage = app.Storage.getStorageSync('cart-check', app.Constants.getCheckFailTip);
    var num = Object.keys(cartCheckMap).length;

    if (num <= 0) {
      this.showZanTopTips('请选择要删除的商品');
    } else {
      wx.showModal({
        title: '提示',
        confirmColor: '#ea4242',
        content: '确定要删除这' + num + '种商品吗？',
        success: function (res) {
          if (res.confirm) {
            for (var key in cartCheckMap) {
              delete cartStorage[key];
              delete cartCheckStorage[key];
            }

            that.setData({
              cartStorage: cartStorage,
              cartCheckMap: {},
              cartEmpty: app.Check.isUndeFinedOrNullOrEmpty(cartStorage)
            })
            that.calculateAmount();
            that.setCartCheckStorage(cartCheckStorage, true);
            app.Storage.setStorageSync('cart', cartStorage, app.Constants.addToCartFailTip)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  //数量改变
  handleZanQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;

    this.setData({
      [`cartStorage.${componentId}.goodsQty`]: quantity
    });
    this.calculateAmount();
    app.Storage.setStorageSync('cart', this.data.cartStorage, app.Constants.addToCartFailTip);
  },
  //结算
  account() {
    var lines = [];
    var cartStorage = this.data.cartStorage;
    var cartCheckMap = this.data.cartCheckMap;

    if (app.Check.isUndeFinedOrNullOrEmpty(cartCheckMap)) {
      this.showZanTopTips('至少选择一个商品');
    } else {
      for (var key in cartCheckMap) {
        lines.push(cartStorage[key]);
      }

      this.setData({
        "goodsOrder.lines": lines
      })

      app.setGoodsOrder(this.data.goodsOrder);
      app.jumpTo('../orderDetail/orderDetail?isAccount=true');
    }
  }
}))