//index.js
var cartAdd = require('../../style/ui/cart-add/index');//引入数字输入控件

//获取应用实例
var App = getApp();

var categoryGoodsPanelScrollTopMap = {};//记录各个类别商品面板scrollTop区间的Map
var selectCategoryFlag = false;//标记：是否选择了侧边栏的类别
var categoryArr = [];//类别
var goodsItemHeight = 81;//每条商品容器的高度
var goodsCategoryHeight = 26;//面板类别标题的高度

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
    loadmore: true
  },
  onReady() {
    this.getGoods();
  },

  //获取商品
  getGoods() {
    var that = this;
    var params = App.Http.buildParams()
    App.Http.request('goods/getGoods.do', params, function (res) {
      categoryArr = Object.keys(res.data)
      that.getCategoryGoodsPanelScrollTop(res.data)
      that.setData({
        goodsMap: res.data,
        selectedCategory: categoryArr[0]
      })
    })
  },
  //获取商品各个类别商品面板的scrollTop,用于滚动面板自动识别当前类别
  getCategoryGoodsPanelScrollTop(data) {
    var result = {};
    var top = 0;//已计算的高度
    for (var key in data) {
      var items = data[key];
      var len = items.length;
      var arr = [];

      arr[0] = top;
      top += goodsCategoryHeight + goodsItemHeight * len;
      arr[1] = top;
      result[key] = arr;
    }
    categoryGoodsPanelScrollTopMap = result;
  },
  //商品面板滚动
  handleScrollGoodsContent(e) {
    var scrollTop = e.detail.scrollTop;
    var dataMap = categoryGoodsPanelScrollTopMap;

    if (!selectCategoryFlag) {
      for (var key in dataMap) {
        var topArr = dataMap[key];
        if (scrollTop >= topArr[0] && scrollTop < topArr[1]) {
          this.setCategory(key);
          break;
        }
      }
    }
    selectCategoryFlag = false;
  },

  //设置类别
  setCategory(category) {
    if (category !== this.data.selectedCategory) {
      this.setData({
        selectedCategory: category
      });
    }
  },
  //选择类别
  selectCategory(event) {
    selectCategoryFlag = true;
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
