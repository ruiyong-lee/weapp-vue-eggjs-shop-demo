<template>
  <view class="index">
    <view class="cu-bar bg-blue">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="搜索商品" :adjust-position="false"></input>
      </view>
    </view>

    <view class="vertical-box">
      <scroll-view class="vertical-nav nav" scroll-y scroll-with-animation
                   :scroll-top="verticalNavTop">
        <view class="cu-item" :class="index === tabCur ? 'text-blue cur' : ''"
              v-for="(item, index) in goodsList" :key="index" @tap="tabSelet(index)">
          {{item.label}}
        </view>
      </scroll-view>
      <scroll-view class="vertical-main" scroll-y scroll-with-animation
                   :scroll-into-view="'main-' + mainCur" @scroll="handleVerticalMainScroll">
        <view class="padding-top padding-lr" v-for="(item, index) in goodsList" :key="index"
              :id="'main-' + index">
          <view class="cu-bar bg-white solid-bottom">
            <view class="action sub-title">
              <text class="text-xl text-bold text-blue">{{item.label}}</text>
              <text class="bg-blue" style="width:2rem"></text>
            </view>
          </view>
          <view v-if="!item.list || item.list.length === 0" class="cu-list menu">
            <view class="cu-item">
              <view class="content">
                <text class="text-grey">暂无{{item.label}}商品</text>
              </view>
            </view>
          </view>
          <view v-else class="cu-list menu-avatar">
            <view class="cu-item" v-for="(goods, index) in item.list" :key="index">
              <view class="cu-avatar lg"
                    :style="'background-image:url(' + goods.thumbnail + ');'"></view>
              <view class="content">
                <view>{{goods.name}}</view>
                <view class="text-gray text-sm flex">
                  <text class="text-cut">单位：{{goods.unitName}}</text>
                </view>
              </view>
              <view class="action">
                <view class="text-red text-xl">￥{{goods.salePrice}}</view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      this.load = true;
      return {
        goodsList: [],
        tabCur: 0,
        mainCur: 0,
        verticalNavTop: 0,
      };
    },
    onLoad() {
      this.getGoodsWithCategory();
    },
    methods: {
      // 查询符合条件的商家
      async getGoodsWithCategory() {
        this.goodsList = await this.$api.goods.getGoodsWithCategory() || [];
      },
      tabSelet(index = 0) {
        this.tabCur = index;
        this.mainCur = index;
        this.verticalNavTop = (index - 1) * 50;
      },
      handleVerticalMainScroll(e) {
        let tabHeight = 0;
        const scrollTop = e.detail.scrollTop + 10;

        if (this.load) {
          this.goodsList.forEach((item, index) => {
            const view = uni.createSelectorQuery().select(`#main-${index}`);

            view.fields({ size: true }, (data) => {
              item.top = tabHeight;
              tabHeight += data.height;
              item.bottom = tabHeight;
            }).exec();
          });

          this.load = false;
        }

        this.goodsList.forEach((item = {}, index) => {
          const { top, bottom } = item;

          if (scrollTop > top && scrollTop < bottom) {
            this.verticalNavTop = (index - 1) * 50;
            this.tabCur = index;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .index {
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
