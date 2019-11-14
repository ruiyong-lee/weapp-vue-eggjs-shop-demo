<template>
  <view class="cart">
    <goods-list
      :datas="cart"
      :emptyOptions="emptyOptions"
      right="number"
      paddingBottom="100rpx"
      group
      selectable
      @handleNumberChange="cartNumChange"
    >
    </goods-list>

    <view v-if="Object.keys(cart).length > 0" class="cu-bar bg-white solid-top cart-bottom-bar">
      <view class="cart-bottom-bar__left text-cut">
        <text class="cuIcon-round cart-select text-grey"></text>
        <text class="margin-right">全选</text>
        <text class="text-lg">
          合计：
          <text class="text-red text-df">￥
            <text class="text-xl text-bold">999.3</text>
          </text>
        </text>
      </view>
      <view class="cart-bottom-bar__right">
        <button class="cu-btn bg-red round shadow-blur">去结算</button>
      </view>
    </view>
  </view>
</template>

<script>
  import goodsList from '../../components/goods-list.vue';
  import cartEmptyIcon from '../../static/cart-empty.png';

  export default {
    components: { goodsList },
    data() {
      return {
        cart: {},

        // goodsList组件无数据提示配置
        emptyOptions: {
          title: '购物车还没有商品',
          text: '赶紧来添加吧',
          icon: cartEmptyIcon,
        },
      };
    },
    methods: {
      // 获取购物车信息
      getCartStorage() {
        this.cart = uni.getStorageSync(this.$constants.CART) || {};
      },
      // 购物车数字组件值改变
      cartNumChange(data = {}) {
        const { key: goodsUuid, value, index } = data;

        if (index && goodsUuid) {
          this.cart[index].lines[goodsUuid].quantity = value;
          uni.setStorageSync(this.$constants.CART, this.cart);
        }
      },
    },
    onLoad() {
    },
    onShow() {
      this.getCartStorage();
    },
  };
</script>

<style lang="scss">
  .cart {
    &-select {
      margin: 0 !important;
      padding-right: rpx(20);
      font-size: rpx(46) !important;
    }

    &-bottom-bar {
      position: fixed;
      bottom: 0;
      padding: 0 30px !important;
      width: 100%;

      .cart-bottom-bar__left {
        display: flex;
        align-items: center;
        flex: 1 !important;
      }

      .cart-bottom-bar__right {
        flex: 0 0 190px !important;
        text-align: right;
      }
    }
  }
</style>
