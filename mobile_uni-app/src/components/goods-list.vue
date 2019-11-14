<!--商品列表组件-->
<template>
  <view class="vertical-box" :class="{ 'vertical-scroll': scroll, relative: height === 'auto' }"
        :style="{ 'padding-top': paddingTop, 'padding-bottom': paddingBottom, height }">
    <!--侧边tab栏-->
    <scroll-view v-if="scroll" class="vertical-nav nav"
                 scroll-y scroll-with-animation :scroll-top="verticalNavTop">
      <view class="cu-item" :class="index === tabCur ? 'text-blue cur' : ''"
            v-for="(item, index) in datas" :key="index" @tap="categoryTabSelect(index)">
        {{item.label}}
      </view>
    </scroll-view>

    <!--主容器-->
    <scroll-view class="vertical-main" scroll-y scroll-with-animation
                 :scroll-into-view="'goods-' + mainCur" @scroll="handleVerticalMainScroll">
      <!--无数据-->
      <view v-if="emptyOptions && (getDatasLen(datas) === 0)" class="goods-empty">
        <view class="text-center">
          <image class="goods-empty-icon" :src="emptyOptions.icon"></image>
          <view class="margin-top">{{emptyOptions.title}}</view>
          <view>{{emptyOptions.text}}</view>
        </view>
      </view>

      <!--数据列表-->
      <view v-else>
        <view
          :class="{ 'padding-top padding-lr': scroll, 'padding-bottom': scroll && index === getDatasLen(datas) - 1 }"
          v-for="(item, index) in datas"
          :key="index"
          :id="'goods-' + index"
        >
          <view :class="{ 'shadow-normal': scroll }">
            <view v-if="group" class="cu-bar bg-white solid-bottom">
              <view class="action" :class="{ 'sub-title': !selectable }">
                <text v-if="selectable" class="cuIcon-round cart-select text-grey"></text>
                <text class="text-xl text-bold text-blue">{{item.label}}</text>
                <text v-if="!selectable" class="bg-blue"
                      :style="'width:' + (getStrRealLen(item.label) * 2) + 'em'"></text>
              </view>
            </view>
            <view v-if="group && getDatasLen(item.lines) === 0" class="cu-list menu">
              <view class="cu-item">
                <view class="content">
                  <text class="text-grey">暂无{{item.label}}商品</text>
                </view>
              </view>
            </view>
            <view v-else class="cu-list menu-avatar">
              <view
                class="cu-item goods-item"
                :class="{ 'has-icon': right === 'icon', 'has-number': right === 'number', 'has-select': selectable, 'move-cur': touchKey === key }"
                v-for="(goods, key) in item.lines"
                :key="key"
                @touchstart="itemTouchStart"
                @touchmove="itemTouchMove"
                @touchend="itemTouchEnd(key)"
              >
                <text v-if="selectable" class="cuIcon-round goods-item-select text-grey"></text>
                <view class="cu-avatar lg goods-item-thumb"
                      :style="goods.thumbnail ? 'background-image:url(' + goods.thumbnail + ');' : ''"></view>
                <view class="content goods-item-content">
                  <view class="text-cut">
                    {{goods.name}}
                    <text class="margin-left-xs text-xs">({{goods.unitName}})</text>
                  </view>
                  <view class="text-cut text-red text-left">￥
                    <text class="text-xl">{{goods.salePrice}}</text>
                  </view>
                </view>
                <view class="goods-item-right">
                  <view v-if="right === 'icon'" class="cuIcon-cart text-blue right-icon"
                        @click="rightIconTap(goods, key)"></view>
                  <uni-number-box v-if="right === 'number'" :value="goods.quantity"
                                  @change="numChange($event, key, index)"></uni-number-box>
                </view>
                <view class="move">
                  <view class="bg-red">删除</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import uniNumberBox from '../lib/uni-number-box/uni-number-box.vue';

  export default {
    name: 'goodsList',
    components: { uniNumberBox },
    props: {
      // 上边距
      paddingTop: {
        type: [String, Number],
        default: 0,
      },
      // 下边距
      paddingBottom: {
        type: [String, Number],
        default: 0,
      },
      // 高度，默认百分百
      height: {
        type: [String, Number],
        default: '100%',
      },
      right: String, // 列表项右侧内容，默认无，icon：图标按钮，number：uni-number-box，
      selectable: Boolean, // 是否可勾选
      removeable: Boolean, // 是否可删除
      group: Boolean, // 是否根据类别分组展示
      scroll: Boolean, // 是否滚动定位
      emptyOptions: Object, // 无数据提示
      datas: [Array, Object], // 列表数据
    },
    data() {
      this.tabTap = false; // 是否点击类别tab
      return {
        tabCur: 0, // tab当前索引
        mainCur: 0, // main当前索引
        verticalNavTop: 0, // tab导航条滚动高度
        touchKey: '', // 触摸对象的key
        touchStartX: 0, // 触摸开始位置
        touchDirection: null, // 触摸方向
      };
    },
    mounted() {
      console.log(this.datas);
    },
    watch: {
      datas(val) {
        if (val && this.scroll) {
          this.$nextTick(() => {
            this.initVerticalMainScroll();
          });
        }
      },
    },
    methods: {
      // 左侧类别tab选中
      categoryTabSelect(index = 0) {
        this.tabCur = index;
        this.mainCur = index;
        this.verticalNavTop = (index - 1) * 50;
        this.tabTap = true;
      },
      // 初始化商品列表滚动定位
      initVerticalMainScroll() {
        let tabHeight = 0;

        this.datas.forEach((item = {}, index) => {
          const view = uni.createSelectorQuery().in(this).select(`#goods-${index}`);

          view.fields({ size: true }, (data) => {
            item.top = tabHeight;
            tabHeight += data && data.height;
            item.bottom = tabHeight;
          }).exec();
        });

        this.$emit('update:datas', this.datas);
      },
      // 右侧商品列表滚动定位
      handleVerticalMainScroll(e) {
        const scrollTop = e.detail.scrollTop + 10;

        if (!this.tabTap) {
          this.datas.forEach((item = {}, index) => {
            const { top, bottom } = item;

            if (scrollTop > top && scrollTop < bottom) {
              this.verticalNavTop = (index - 1) * 50;
              this.tabCur = index;
            }
          });
        }

        this.tabTap = false;
      },
      // 右侧按钮点击，暂时默认添加购物车按钮，之后有需要的再自定义
      rightIconTap(goods) {
        this.$emit('handleRightIconTap', goods);
      },
      // 添加购物车弹窗数字组件值改变
      numChange(value, key, index) {
        this.$emit('handleNumberChange', { key, value, index });
      },
      // 触摸开始
      itemTouchStart(e) {
        if (this.removeable) {
          this.touchStartX = e.touches[0].pageX;
        }
      },
      // 计算方向
      itemTouchMove(e) {
        if (this.removeable) {
          this.touchDirection = e.touches[0].pageX - this.touchStartX > 0 ? 'right' : 'left';
        }
      },
      // 计算滚动
      itemTouchEnd(key) {
        if (this.removeable) {
          if (this.touchDirection === 'left') {
            this.touchKey = key;
          } else {
            this.touchKey = null;
          }
          this.touchDirection = null;
        }
      },
      // 获得字符串实际长度，中文2，英文1
      getStrRealLen() {
        return this.$util.getStrRealLen;
      },
      // 获取数据长度，参数可能是数组或对象
      getDatasLen(datas) {
        if (this.$util.isObject(datas)) {
          return Object.keys(datas).length;
        }
        if (this.$util.isArray(datas)) {
          return datas.length;
        }

        return 0;
      },
    },
  };
</script>

<style lang="scss" scoped>
  /*类别商品*/
  .vertical-box {
    position: absolute;
    display: flex;
    top: 0;
    width: 100%;
    height: 100%;

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

      /*无商品*/
      .goods-empty {
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
        }
      }

      /*商品列表项*/
      .goods-item {

        &-content {
          width: calc(100% - 200px) !important;
        }

        &-right {
          padding-right: rpx(20);
          text-align: right;

          .right-icon {
            font-size: rpx(48) !important;
          }
        }

        &.has-icon {
          .goods-item-content {
            width: calc(100% - 240px) !important;
          }
        }

        &.has-number {
          .goods-item-content {
            width: calc(100% - 420px) !important;
          }
        }

        &.has-select {
          .goods-item-select {
            position: absolute;
            left: rpx(30);
            margin: 0 !important;
            padding-right: rpx(20);
            font-size: rpx(46) !important;
          }

          .goods-item-thumb {
            left: rpx(96) !important;
          }

          .goods-item-content {
            left: rpx(212) !important;
          }

          &.has-icon {
            .goods-item-content {
              width: calc(100% - 305px) !important;
            }
          }

          &.has-number {
            .goods-item-content {
              width: calc(100% - 485px) !important;
            }
          }
        }
      }
    }
  }
</style>
