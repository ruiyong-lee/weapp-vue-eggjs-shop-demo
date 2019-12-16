<!--商品列表组件-->
<template>
  <view class="goods-box" :class="{ 'goods-scroll': scroll, relative: height === 'auto' }"
        :style="{ 'padding-top': paddingTop, 'padding-bottom': paddingBottom, height }">
    <!--侧边tab栏-->
    <scroll-view v-if="scroll" class="goods-nav nav"
                 scroll-y scroll-with-animation :scroll-top="verticalNavTop">
      <view class="cu-item" :class="index === tabCur ? 'text-blue cur' : ''"
            v-for="(item, index) in datas" :key="index" @tap="categoryTabSelect(index)">
        {{item.label}}
      </view>
    </scroll-view>

    <!--主容器-->
    <scroll-view class="goods-main" scroll-y scroll-with-animation
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
      <view v-else :class="{ 'padding-right padding-bottom padding-left': scroll }">
        <view
          :class="{ 'padding-top': scroll && group, 'padding-bottom': !scroll && group }"
          v-for="(item, index) in datas"
          :key="index"
          :id="'goods-' + index"
        >
          <view :class="{ 'shadow-normal': scroll }">
            <view v-if="group" class="cu-bar bg-white solid-bottom">
              <view class="action" :class="{ 'sub-title': !selectable }">
                <text v-if="selectable" class="goods-select"
                      :class="item.checked ? 'cuIcon-roundcheckfill text-red' : 'cuIcon-round text-grey'"
                      @tap="selectCategory(index)"></text>
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
                <text v-if="selectable" class="goods-item-select"
                      :class="goods.checked ? 'cuIcon-roundcheckfill text-red' : 'cuIcon-round text-grey'"
                      @tap="selectGoods(key, index)"></text>
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
                  <text v-if="goods.isDown" class="text-red">此商品已下架</text>
                  <view v-else-if="right === 'icon'" class="cuIcon-cart text-blue right-icon"
                        @click="rightIconTap(goods, key)"></view>
                  <uni-number-box v-else-if="right === 'number'" :value="goods.quantity" :min="1"
                                  @change="numChange($event, key, index)"></uni-number-box>
                </view>
                <view class="move" @tap="remove(key, index)">
                  <view class="bg-red">删除</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!--底部-->
    <view v-if="selectable && Object.keys(datas).length > 0"
          class="cu-bar bg-white solid-top goods-footer">
      <view class="goods-footer-left text-cut">
        <text class="goods-select"
              :class="checkedAll ? 'cuIcon-roundcheckfill text-red' : 'cuIcon-round text-grey'"
              @tap="selectAll"></text>
        <text class="margin-right">全选</text>
        <text class="text-lg">
          合计：
          <text class="text-red text-df">￥
            <text class="text-xl text-bold">{{totalAmount}}</text>
          </text>
        </text>
      </view>
      <view class="goods-footer-right">
        <button class="cu-btn bg-red round shadow-blur" @tap="settle">去结算</button>
      </view>
    </view>
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
      datas: [Array, Object], // 列表数据，selectable时必须为Object类型
    },
    data() {
      this.tabTap = false; // 是否点击类别tab
      this.selectedGoods = []; // 选中的商品
      return {
        tabCur: 0, // tab当前索引
        mainCur: 0, // main当前索引
        verticalNavTop: 0, // tab导航条滚动高度
        touchKey: '', // 触摸对象的key
        touchStartX: 0, // 触摸开始位置
        touchDirection: null, // 触摸方向
        checkedAll: false, // 是否全选
        totalQty: 0, // 合计数量
        totalAmount: 0, // 合计金额
      };
    },
    watch: {
      datas(val) {
        if (val) {
          if (this.scroll) {
            this.$nextTick(() => {
              this.initVerticalMainScroll();
            });
          } else {
            this.calQtyAndAmount();
            this.judgeCheckedAll();
          }
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
        this.$emit('change');
      },
      // 右侧商品列表滚动定位
      handleVerticalMainScroll(e) {
        const scrollTop = e.detail.scrollTop + 10;

        if (!this.tabTap) {
          this.mainCur = -1;
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
        this.$emit('rightIconTap', goods);
      },
      // 添加购物车弹窗数字组件值改变
      numChange(value, key, index) {
        this.datas[index].lines[key].quantity = value;
        this.$emit('update:datas', this.datas);
        this.$emit('change');
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
      // 删除
      remove(key, index) {
        // 600ms是删除动画的时长
        setTimeout(() => {
          this.$delete(this.datas[index].lines, key);
          // 如果该类别下没有商品了，直接移除类别
          if (Object.keys(this.datas[index].lines || {}).length === 0) {
            this.$delete(this.datas, index);
          }
          this.$emit('update:datas', this.datas);
          this.$emit('change');
        }, 600);
      },
      // 一个类别下的商品全选
      selectCategory(index) {
        const { checked, lines = {} } = this.datas[index] || {};

        this.$set(this.datas[index], 'checked', !checked);
        Object.keys(lines).forEach((key) => {
          this.$set(lines[key], 'checked', !checked);
        });
        this.$emit('update:datas', this.datas);
        this.$emit('change');
      },
      // 选中商品
      selectGoods(key, index) {
        const { lines = {} } = this.datas[index] || {};
        const { checked: goodsChecked } = lines[key] || {};

        this.$set(lines[key], 'checked', !goodsChecked);
        this.$set(this.datas[index], 'checked', goodsChecked
          ? false
          : !Object.values(lines).some(goods => !goods.checked));
        this.$emit('update:datas', this.datas);
        this.$emit('change');
      },
      // 全选
      selectAll() {
        const { checkedAll, datas = {} } = this;

        this.checkedAll = !checkedAll;
        Object.keys(datas).forEach((key) => {
          const { lines = {} } = datas[key];
          this.$set(datas[key], 'checked', !checkedAll);
          Object.keys(lines).forEach((goodsKey) => {
            this.$set(lines[goodsKey], 'checked', !checkedAll);
          });
        });
        this.$emit('update:datas', this.datas);
        this.$emit('change');
      },
      // 判断是否全选
      judgeCheckedAll() {
        let checkedAll = true;
        const { datas = {} } = this;

        Object.entries(datas).forEach(([index, value = {}]) => {
          const { lines = {} } = value;
          const checked = !Object.values(lines).some(goods => !goods.checked);

          if (!checked) checkedAll = false;
          this.$set(this.datas[index], 'checked', checked);
        });
        this.checkedAll = checkedAll;
      },
      // 计算总数量和金额
      calQtyAndAmount() {
        let totalQty = 0;
        let totalAmount = 0;
        const selectedGoods = [];
        const { datas = {} } = this;
        const { add, multiply, round } = this.$util;

        Object.keys(datas).forEach((key) => {
          const { lines = {} } = datas[key];
          Object.keys(lines).forEach((goodsKey) => {
            const goods = lines[goodsKey] || {};
            const { checked, salePrice, quantity } = goods;
            if (checked) {
              totalQty = add(totalQty, quantity);
              totalAmount = round(add(totalAmount, multiply(salePrice, quantity)), 2);
              selectedGoods.push(goods);
            }
          });
        });
        this.totalQty = totalQty;
        this.totalAmount = totalAmount;
        this.selectedGoods = selectedGoods;
      },
      // 结算
      settle() {
        const { selectedGoods = {} } = this;

        if (selectedGoods.length === 0) {
          uni.showToast({ title: '请先选择商品', icon: 'none' });
          return;
        }
        if (selectedGoods.some(item => item.isDown)) {
          uni.showToast({ title: '部分商品已下架，请重新选择', icon: 'none' });
          return;
        }

        getApp().globalData.order = this.buildOrder(selectedGoods);
        uni.navigateTo({ url: '/pages/order/view' });
      },
      // 构建订单
      buildOrder(selectedGoods = []) {
        return {
          goodsTotalQty: this.totalQty,
          totalAmount: this.totalAmount,
          lines: selectedGoods.map(goods => ({
            goodsCategoryName: goods.categoryName,
            goodsName: goods.name,
            goodsPic: goods.thumbnail,
            goodsQty: goods.quantity,
            goodsSpec: goods.spec,
            goodsUuid: goods.uuid,
            salePrice: goods.salePrice,
            unitName: goods.unitName,
          })),
        };
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
  .goods-box {
    position: absolute;
    display: flex;
    top: 0;
    width: 100%;
    height: 100%;

    .goods-select {
      margin: 0 !important;
      padding-right: rpx(20);
      font-size: rpx(46) !important;
    }

    .goods-nav.nav {
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

    .goods-main {
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
          width: rpx(510 - 200) !important;
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
            width: rpx(510 - 240) !important;
          }
        }

        &.has-number {
          .goods-item-content {
            width: rpx(510 - 420) !important;
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
              width: rpx(750 - 305) !important;
            }
          }

          &.has-number {
            .goods-item-content {
              width: rpx(750 - 485) !important;
            }
          }
        }
      }
    }

    .goods-footer {
      position: fixed;
      bottom: 0;
      padding: 0 rpx(30) !important;
      width: 100%;

      &-left {
        display: flex;
        align-items: center;
        flex: 1 !important;
      }

      &-right {
        flex: 0 0 rpx(190) !important;
        text-align: right;
      }
    }
  }
</style>
