//index.js
var cartAdd = require('../../style/ui/cart-add/index');//引入数字输入控件
//获取应用实例
var App = getApp();

Page(Object.assign({}, cartAdd, {
  data: {
    cartData: {
      quantity: 1,
      min: 1,
      max: 9999,
      showDialog: false
    },
    goodsMap: {},
    selectedCategory: '',
    activeCategoryPanel: '',
    categoryPanelScrollTopMap: {},
    testArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    loadmore: true
  },
  onReady() {
    this.getGoods()
  },

  //获取商品
  getGoods() {
    var that = this;
    var params = App.Http.buildParams()
    App.Http.request('goods/getGoods.do', params, function (res) {
      that.getCategoryPanelScrollTop(res.data)
      that.setData({
        goodsMap: res.data,
        selectedCategory: Object.keys(res.data)[0]
      })
    })
  },
  //获取商品各个类别商品面板的scrollTop,用于滚动面板自动识别当前类别
  getCategoryPanelScrollTop(data) {
    var result = {};
    var height = 0;//已计算的高度
    var goodsItemHeight = 81;//每条商品容器的高度
    var goodsCategoryHeight = 26;//面板类别标题的高度
    for (var key in data) {
      var items = data[key];
      var id = items[0] ? items[0].uuid : '';
      var len = items.length;

      height += goodsCategoryHeight + goodsItemHeight * len;
      result[id] = height;
    }
    this.setData({
      categoryPanelScrollTopMap: result
    });
    console.log(this.data.categoryPanelScrollTopMap)
  },
  handleScrollGoodsContent(e) {
    // console.log(e)
  },

  //选择类别
  selectCategoty(event) {
    this.setData({
      selectedCategory: event.currentTarget.dataset.category,
      activeCategoryPanel: event.currentTarget.dataset.categoryPanel
    });
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
