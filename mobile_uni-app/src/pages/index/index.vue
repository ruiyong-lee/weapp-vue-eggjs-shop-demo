<template>
  <view class="index">
    <!--搜索栏-->
    <view class="search-box cu-bar" :class="{'bg-blue': !searchPanelVisible}">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input type="text" v-model="keywords" placeholder="搜索商品"
               confirm-type="search" @focus="showSearchPanel" @confirm="search(keywords)"></input>
        <view v-if="keywords" class="action cuIcon-roundclosefill text-gray search-clear"
              @tap="keywords = ''"></view>
      </view>
      <view v-if="searchPanelVisible" class="action text-gray" @tap="hideSearchPanel">
        取消
      </view>
    </view>

    <!--搜索面板-->
    <view class="search-panel" :class="{ 'show': searchPanelVisible }">
      <view v-if="historyKeywordsVisible">
        <view class="cu-bar bg-white">
          <view class="action border-title">
            <text class="text-xl text-bold">历史搜索</text>
            <text class="bg-grey" style="width:2em"></text>
          </view>
        </view>
        <view class="padding">
          <view class='cu-tag radius' v-for="(item, index) in historyKeywords"
                :key="index" @tap="search(item)">
            {{item}}
          </view>
        </view>
      </view>

      <view v-else-if="!filterGoodsList || filterGoodsList.length === 0" class="search-empty">
        <view class="text-center">
          <view class="search-empty-icon"></view>
          <view class="margin-top">没有查找到商品</view>
          <view>换个关键词试试吧</view>
        </view>
      </view>

      <view v-else>
        <goods-list :datas="filterGoodsList" @handleRightIconTap="showCartModal"></goods-list>
      </view>
    </view>

    <!--商品-->
    <view class="vertical-box">
      <scroll-view class="vertical-nav nav" scroll-y scroll-with-animation
                   :scroll-top="verticalNavTop">
        <view class="cu-item" :class="index === tabCur ? 'text-blue cur' : ''"
              v-for="(item, index) in goodsList" :key="index" @tap="categoryTabSelect(index)">
          {{item.label}}
        </view>
      </scroll-view>
      <scroll-view class="vertical-main" scroll-y scroll-with-animation
                   :scroll-top="verticalMainTop"
                   :scroll-into-view="'main-' + mainCur" @scroll="handleVerticalMainScroll">
        <view class="padding-top padding-lr"
              :class="{ 'padding-bottom': index === goodsList.length - 1 }"
              v-for="(item, index) in goodsList" :key="index" :id="'main-' + index">
          <view class="shadow-normal">
            <view class="cu-bar bg-white solid-bottom category-bar">
              <view class="action sub-title">
                <text class="text-xl text-bold text-blue">{{item.label}}</text>
                <text class="bg-blue"
                      :style="'width:' + (getStrRealLen(item.label) * 2) + 'em'"></text>
              </view>
            </view>
            <view v-if="!item.list || item.list.length === 0" class="cu-list menu">
              <view class="cu-item">
                <view class="content">
                  <text class="text-grey">暂无{{item.label}}商品</text>
                </view>
              </view>
            </view>
            <goods-list v-else :datas="item.list" mode="icon"
                        @handleRightIconTap="showCartModal"></goods-list>
          </view>
        </view>
      </scroll-view>
    </view>

    <!--添加购物车弹窗-->
    <view class="cu-modal bottom-modal" :class="{ 'show': cartModalVisible }">
      <view class="cu-dialog">
        <view class="cu-bar bg-white solid-bottom">
          <view class="action text-blue" @tap="addToCart">添加到购物车</view>
          <view class="action text-gray" @tap="cartModalVisible = false">取消</view>
        </view>
        <view class="solid-top">
          <goods-list :datas="[selectedGoods]" mode="number"
                      @handleNumberChange="cartModalNumChange"></goods-list>
          <view class="cu-form-group">
            <view class="title">备注</view>
            <input class="text-right" placeholder="请填写备注" v-model="selectedGoods.remark"></input>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import goodsList from '../../components/goods-list.vue';

  export default {
    components: { goodsList },
    data() {
      this.tabTap = false; // 是否点击类别tab
      this.goodsItems = []; // 记录商品项滚动高度
      return {
        keywords: '',
        goodsList: [],
        filterGoodsList: [],
        historyKeywords: [],
        tabCur: 0,
        mainCur: 0,
        verticalNavTop: 0,
        verticalMainTop: 0,
        selectedGoods: {},
        cartModalVisible: false,
        searchPanelVisible: false,
        historyKeywordsVisible: true,
      };
    },
    onLoad() {
      this.getGoodsWithCategory();
    },
    watch: {
      keywords(val) {
        // 没有关键词时，显示历史搜索记录
        if (!val) {
          this.historyKeywordsVisible = true;
        }
      },
    },
    methods: {
      // 查询带类别的商品信息
      async getGoodsWithCategory() {
        this.goodsList = await this.$api.goods.getGoodsWithCategory() || [];
        this.$nextTick(() => {
          this.initVerticalMainScroll();
        });
      },
      // 显示搜索面板
      showSearchPanel() {
        this.searchPanelVisible = true;
        this.historyKeywords = uni.getStorageSync(this.$constants.HISTORY_KEYWORDS) || [];
      },
      // 隐藏搜索面板
      hideSearchPanel() {
        this.keywords = '';
        this.searchPanelVisible = false;
      },
      // 搜索商品
      search(keywords) {
        if (keywords) {
          const historyKeywordsOld = uni.getStorageSync(this.$constants.HISTORY_KEYWORDS) || [];

          if (!historyKeywordsOld.includes(keywords)) {
            const historyKeywords = [keywords, ...historyKeywordsOld];
            this.historyKeywords = historyKeywords;
            uni.setStorageSync(this.$constants.HISTORY_KEYWORDS, historyKeywords);
          }

          this.keywords = keywords;
          this.historyKeywordsVisible = false;
          this.filterGoodsList = this.goodsItems.filter(item => item.name.includes(keywords));
        } else {
          this.filterGoodsList = [];
        }
      },
      // 左侧类别tab选中
      categoryTabSelect(index = 0) {
        this.tabCur = index;
        this.mainCur = index;
        this.verticalNavTop = (index - 1) * 50;
        this.tabTap = true;
      },
      // 初始化右侧商品列表滚动定位
      initVerticalMainScroll() {
        let tabHeight = 0;

        this.goodsItems = [];
        this.goodsList.forEach((item = {}, index) => {
          const { list = [] } = item;
          const view = uni.createSelectorQuery().select(`#main-${index}`);

          this.goodsItems = [...this.goodsItems, ...list];

          view.fields({ size: true }, ({ height }) => {
            item.top = tabHeight;
            tabHeight += height;
            item.bottom = tabHeight;
          }).exec();
        });
      },
      // 右侧商品列表滚动定位
      handleVerticalMainScroll(e) {
        const scrollTop = e.detail.scrollTop + 10;

        if (!this.tabTap) {
          this.goodsList.forEach((item = {}, index) => {
            const { top, bottom } = item;

            if (scrollTop > top && scrollTop < bottom) {
              this.verticalNavTop = (index - 1) * 50;
              this.tabCur = index;
            }
          });
        }

        this.tabTap = false;
      },
      // 显示添加购物车弹窗
      showCartModal(goods = {}) {
        this.selectedGoods = goods;
        this.$set(this.selectedGoods, 'remark', '');
        this.$set(this.selectedGoods, 'quantity', 1);
        this.cartModalVisible = true;
      },
      // 添加购物车弹窗数字组件值改变
      cartModalNumChange(val) {
        this.selectedGoods.quantity = val;
      },
      // 添加到购物车
      addToCart() {
        const { selectedGoods = {}, $constants, $util } = this;
        const { categoryUuid, categoryName, quantity = 0, uuid } = selectedGoods;
        const cartStorage = uni.getStorageSync($constants.CART) || {};

        // 类别信息
        if (!cartStorage[categoryUuid]) {
          cartStorage[categoryUuid] = {};
          cartStorage[categoryUuid].label = categoryName;
        }

        // 商品Map
        if (!cartStorage[categoryUuid].goodsMap) {
          cartStorage[categoryUuid].goodsMap = {};
        }

        // 如果购物车已有商品，数量叠加，保留勾选状态，其他信息覆盖
        const { quantity: quantityOld = 0, checked } = cartStorage[categoryUuid].goodsMap[uuid] || {};
        if (quantityOld) {
          selectedGoods.checked = checked;
          selectedGoods.quantity = $util.round($util.add(quantityOld, quantity), 4);
        }
        cartStorage[categoryUuid].goodsMap[uuid] = selectedGoods;

        uni.setStorageSync($constants.CART, cartStorage);
        uni.showToast({ title: $constants.CART_SUCCESS_TIP });
        this.cartModalVisible = false;
      },
      // 获得字符串实际长度，中文2，英文1
      getStrRealLen() {
        return this.$util.getStrRealLen;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .index {
    /*搜索*/
    .search-box {
      z-index: 9;
      transition: all 0.15s ease;

      .search-clear {
        font-size: rpx(32) !important;
      }
    }

    .search-panel {
      position: absolute;
      z-index: 8;
      padding-top: rpx(100);
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background-color: $uni-white;
      transition: all 0.15s ease;
      overflow: hidden;

      &.show {
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
      }

      .cu-tag {
        margin-right: rpx(20);
        margin-bottom: rpx(20);

        + .cu-tag {
          margin-left: 0;
        }
      }

      .search-empty {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        &-icon {
          width: rpx(240);
          height: rpx(240);
          background: url("../../static/data-empty.png") no-repeat center;
          background-size: contain;
        }
      }
    }

    /*类别商品*/
    .vertical-box {
      position: absolute;
      display: flex;
      top: 0;
      padding-top: rpx(100);
      width: 100%;
      height: 100vh;

      .vertical-nav.nav {
        width: rpx(180);
        background-color: $uni-white;

        .cu-item {
          position: relative;
          display: block;
          margin: 0;
          width: 100%;
          text-align: center;
          background-color: #fff;
          border: none;

          &.cur {
            background-color: #f1f1f1;

            &::after {
              content: "";
              width: rpx(8);
              height: rpx(30);
              border-radius: rpx(10) 0 0 rpx(10);
              position: absolute;
              background-color: currentColor;
              top: 0;
              right: 0;
              bottom: 0;
              margin: auto;
            }
          }
        }
      }

      .vertical-main {
        flex: 1;
      }
    }
  }
</style>
