//index.js
var cartAdd = require('../../style/ui/cart-add/index');//引入数字输入控件
var imgDialog = require('../../style/ui/img-dialog/index');//引入大图弹窗控件
var app = getApp();//获取应用实例

var goodsScrollTopMap = {};//记录各个商品scrollTop的Map
var categoryGoodsPanelScrollTopMap = {};//记录各个类别商品面板scrollTop区间的Map
var selectCategoryFlag = false;//标记：是否选择了侧边栏的类别
var goodsContentHeight;
var categoryArr = [];//类别
var goodsItemHeight = 81;//每条商品容器的高度
var goodsCategoryHeight = 26;//面板类别标题的高度

Page(Object.assign({}, cartAdd, imgDialog, {
  data: {
    cartData: {
      quantity: 1,
      remark: '',
      min: 1,
      max: 9999,
      showDialog: false,
      goods: {}
    },
    imgDialog: {
      currentImg: '',
      animationData: {},
      showImgDialog: false
    },
    goodsMap: {},
    searchKey: '',
    selectedCategory: '',
    categoryHeader: '',
    hiddenCategoryHeader: false,
    activeCategoryItem: '',
    activeCategoryPanel: '',
    loadmore: true,
    goodsPanelScrollTop: 0
  },
  onShow() {
    if (app.globalData.isReloadGoods) {
      this.getGoods();
      this.setData({
        searchKey: ''
      })
      app.globalData.isReloadGoods = false
    }
    this.initAnimation()
  },

  //动画
  initAnimation() {
    this.animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 400,
      timingFunction: "ease",
      delay: 0
    })
  },
  //获取商品
  getGoods() {
    var that = this;
    var params = app.Http.buildParams();
    app.Http.request('goods/getGoods.json', params, function (res) {
      categoryArr = Object.keys(res);
      that.getCategoryGoodsPanelScrollTop(res);
      that.setData({
        goodsMap: res,
        selectedCategory: categoryArr[0],
        categoryHeader: categoryArr[0]
      })
      that.getGoodsMap(res);
    })
  },
  //获取商品Map，用于再次购买刷新价格，获取商品对应的scrollTop，用于搜索商品
  getGoodsMap(data) {
    var result1 = {};
    var result2 = {};
    var top = 0;//已计算的高度

    for (var key in data) {
      var list = data[key];
      top += goodsCategoryHeight;
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        result1[item.goods.uuid] = item;
        result2[item.goods.name] = top;
        top += goodsItemHeight;
      }
    }
    app.globalData.goodsMap = result1;
    goodsScrollTopMap = result2;
    this.refreshCartPrice(result1);
  },
  // 刷新购物车商品列表价格，和状态
  refreshCartPrice(data) {
    var cartStorage = app.Storage.getStorageSync('cart', app.Constants.getCartFailTip);
    var cartCheckStorage = app.Storage.getStorageSync('cart-check', app.Constants.getCheckFailTip);

    //记录已经下架的商品数量
    app.globalData.downGoodsQty = 0;

    for (var key in cartStorage) {
      var goods = data[key];
      var cartItem = cartStorage[key];

      //存在刷新价格，不存在提示商品下架
      if (!app.Check.isUndeFinedOrNullOrEmpty(goods)) {
        delete cartItem.isDown;
        cartItem.salePrice = goods.salePrice;
      } else {
        cartItem.isDown = true;
        delete cartCheckStorage[key];
        app.globalData.downGoodsQty++;
      }
    }

    app.Storage.setStorageSync('cart', cartStorage, app.Constants.addToCartFailTip)
    app.Storage.setStorageSync('cart-check', cartCheckStorage, app.Constants.saveCheckFailTip)
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

    //手机上面scrollTop可以滚动到负值，这时候隐藏categoryHeader，注意条件判断，不能每次滚动都执行setData
    if (scrollTop < 0) {
      that.setData({
        hiddenCategoryHeader: true
      });
    } else if (that.data.hiddenCategoryHeader) {
      that.setData({
        hiddenCategoryHeader: false
      });
    }

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
  //获取商品容器高度
  getGoodsContentHeght(cb) {
    if (goodsContentHeight) {
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
      var goodsList = this.data.goodsMap[category];
      var goodsCategoryId = goodsList && goodsList[0].goodsCategory ? goodsList[0].goodsCategory.id : '';
      this.setData({
        selectedCategory: category,
        activeCategoryItem: 'category' + goodsCategoryId,
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
  //搜索商品
  searchGoods(e) {
    var that = this;
    var value = e.detail.value;
    var keys = Object.keys(goodsScrollTopMap);

    if (value) {
      keys.some(function (key) {
        if (key.indexOf(value) >= 0) {
          that.setData({
            goodsPanelScrollTop: goodsScrollTopMap[key] - goodsCategoryHeight
          })
          console.log(goodsScrollTopMap[key])
          return true;
        }
      })
    } else {
      that.setData({
        goodsPanelScrollTop: 0
      })
    }
  },
  //打开关闭添加到购物车弹窗
  toggleDialog(e) {
    var showDialog = this.data.cartData.showDialog;
    var goods = e.currentTarget.dataset.goods;

    this.setData({
      'cartData.showDialog': !showDialog,
      'cartData.goods': !showDialog ? goods : {},
      'cartData.quantity': 1,
      'cartData.remark': ''
    });
  },
  //查看商品大图
  openImgDialog(e) {
    var animation = this.animation;
    var imgSrc = e.currentTarget.dataset.src;
    this.setData({
      'imgDialog.currentImg': imgSrc.split("?x-oss-process=image")[0],
      'imgDialog.showImgDialog': true
    });

    animation.scale(1.05, 1.05).step()
    this.setData({
      'imgDialog.animationData': animation.export()
    })
  },
  //跳转到商品详情，暂时没做
  jumpToDetail(e) {
    app.setSelectedGoods(e.currentTarget.dataset.goods)
    app.jumpTo('../goodsDetail/goodsDetail')
  }
}))
