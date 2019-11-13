<template>
  <view class="cu-list menu-avatar">
    <view class="cu-item goods-item"
          :class="{ 'has-icon': mode === 'icon', 'has-number': mode === 'number', 'has-select': selectable }"
          v-for="(goods, key) in datas"
          :key="key">
      <text v-if="selectable" class="cuIcon-round goods-item-select text-grey"></text>
      <view class="cu-avatar lg goods-item-thumb"
            :style="goods.thumbnail ? 'background-image:url(' + goods.thumbnail + ');' : ''"></view>
      <view class="content goods-item-content">
        <view class="text-cut">
          {{goods.name}}
          <text class="margin-left-xs text-xs">({{goods.unitName}})</text>
        </view>
        <view class="text-cut text-red text-left">
          ￥
          <text class="text-xl">{{goods.salePrice}}</text>
        </view>
      </view>
      <view class="goods-item-right">
        <view v-if="mode === 'icon'" class="cuIcon-cart text-blue right-icon"
              @click="rightIconTap(goods)"></view>
        <uni-number-box v-if="mode === 'number'" :value="goods.quantity"
                        @change="numChange"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  import uniNumberBox from '../lib/uni-number-box/uni-number-box.vue';

  export default {
    name: 'goodsList',
    components: { uniNumberBox },
    data() {
      return {};
    },
    props: {
      mode: String, // 模式，undefined：默认，icon：图标按钮，number：uni-number-box，
      selectable: Boolean, // 是否可勾选
      datas: [Array, Object], // 列表数据
    },
    methods: {
      // 右侧按钮点击，暂时默认添加购物车按钮，之后有需要的再自定义
      rightIconTap(goods) {
        this.$emit('handleRightIconTap', goods);
      },
      // 添加购物车弹窗数字组件值改变
      numChange(val) {
        this.$emit('handleNumberChange', val);
      },
    },
  };
</script>

<style lang="scss" scoped>
  /*商品列表*/
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
</style>
