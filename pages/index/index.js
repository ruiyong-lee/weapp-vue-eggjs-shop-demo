//index.js
var cartAdd = require('../../style/ui/cart-add/index');//引入数字输入控件
//获取应用实例
var app = getApp();

Page(Object.assign({}, cartAdd, {
  data: {
    cartData: {
      quantity: 1,
      min: 1,
      max: 9999,
      showDialog: false
    },
    testArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    loadmore: true
  },
  onShow: function () {
    
  },

  //测试滚动到底加载商品
  testAdd() {
    var that = this;
    setTimeout(function () {
      var arr = that.data.testArr;
      var len = arr.length;

      for (var i = 0; i < len; i++) {
        arr.push(len + i - 1);
      }

      that.setData({
        testArr: arr,
        loadmore: true
      })
    }, 2000)
  },
  //商品列表滚动到底
  lower() {
    if (this.data.loadmore) {
      this.setData({
        loadmore: false
      })
      this.testAdd();
    }
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
