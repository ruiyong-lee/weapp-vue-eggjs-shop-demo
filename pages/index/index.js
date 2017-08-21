//index.js
var cartAdd = require('../../style/ui/cart-add/index');//引入数字输入控件
var app = getApp();//获取应用实例

var categoryGoodsPanelScrollTopMap = {};//记录各个类别商品面板scrollTop区间的Map
var selectCategoryFlag = false;//标记：是否选择了侧边栏的类别
var goodsContentHeight;
var categoryArr = [];//类别
var goodsItemHeight = 81;//每条商品容器的高度
var goodsCategoryHeight = 26;//面板类别标题的高度

Page(Object.assign({}, cartAdd, {
  data: {
    cartData: {
      quantity: 1,
      remark: '',
      min: 1,
      max: 9999,
      showDialog: false,
      goods: {}
    },
    goodsMap: {},
    selectedCategory: '',
    categoryHeader: '',
    activeCategoryPanel: '',
    loadmore: true
  },
  onLoad() {
    this.getGoods();
  },

  //获取商品
  getGoods() {
    var that = this;
    var params = app.Http.buildParams()
    app.Http.request('getGoods.do', params, function (res) {
      var data = JSON.parse(res)
      categoryArr = Object.keys(data)
      that.getCategoryGoodsPanelScrollTop(data)
      that.setData({
        goodsMap: data,
        selectedCategory: categoryArr[0],
        categoryHeader: categoryArr[0]
      })
      that.getGoodsMap(data)
    })
  },
  //获取商品Map，用于再次购买刷新价格
  getGoodsMap(data) {
    var result = {}

    for(var key in data) {
      var list = data[key]
      for(var i=0;i<list.length;i++) {
        var item = list[i]
        result[item.goods.uuid] = item
      }
    }
    app.globalData.goodsMap = result
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
    var that = this;
    var scrollTop = e.detail.scrollTop;
    var scrollheight = e.detail.scrollheight;
    var dataMap = categoryGoodsPanelScrollTopMap;

    that.getGoodsContentHeght(function () {
      for (var key in dataMap) {
        var topArr = dataMap[key];
        if (scrollTop >= topArr[0] && scrollTop < topArr[1]) {
          if (!selectCategoryFlag) {
            that.setCategory(key);
          }
          that.setCategoryHeader(key);
          break;
        }
      }
      selectCategoryFlag = false;
    })
  },
  // 获取商品容器高度
  getGoodsContentHeght(cb) {
    if (!goodsContentHeight) {
      return typeof (cb) == 'function' ? cb() : '';
    } else {
      wx.createSelectorQuery().select('#goods_content_scroll').boundingClientRect(function (rect) {
        goodsContentHeight = rect.height;
        return typeof (cb) == 'function' ? cb() : '';
      }).exec()
    }
  },
  //设置类别
  setCategory(category) {
    if (category !== this.data.selectedCategory) {
      this.setData({
        selectedCategory: category
      });
    }
  },
  setCategoryHeader(category) {
    if (category !== this.data.categoryHeader) {
      this.setData({
        categoryHeader: category
      });
    }
  },
  //选择类别
  selectCategory(e) {
    var dataset = e.currentTarget.dataset;

    selectCategoryFlag = true;
    this.setData({
      selectedCategory: dataset.category,
      activeCategoryPanel: dataset.categoryPanel
    });
  },
  //打开关闭添加到购物车弹窗
  toggleDialog(e) {
    var showDialog = this.data.cartData.showDialog;
    var goods = e.currentTarget.dataset.goods;

    this.setData({
      "cartData.showDialog": !showDialog,
      "cartData.goods": !showDialog ? goods : {},
      "cartData.quantity": 1,
      "cartData.remark": '',
    });
  },
  //跳转到商品详情
  jumpToDetail(e) {
    app.setSelectedGoods(e.currentTarget.dataset.goods)
    app.jumpTo('../goodsDetail/goodsDetail')
  }
}))
