<template>
  <view class="cart">
    <view class="margin-bottom shadow-normal" v-for="(item, key) in cart" :key="key">
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text class="cuIcon-round cart-select text-grey"></text>
          <text class="text-xl text-bold text-blue">{{item.label}}</text>
        </view>
      </view>
      <goods-list :datas="item.goodsMap" mode="number" selectable
                  @handleNumberChange="cartModalNumChange"></goods-list>
    </view>
  </view>
</template>

<script>
  import goodsList from '../../components/goods-list.vue';

  export default {
    components: { goodsList },
    data() {
      return {
        cart: {},
      };
    },
    methods: {
      // 获取购物车信息
      getCartStorage() {
        this.cart = uni.getStorageSync(this.$constants.CART) || {};
      },
      // 购物车数字组件值改变
      cartModalNumChange(val) {
        this.selectedGoods.quantity = val;
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
    .cart-select {
      margin: 0 !important;
      padding-right: rpx(20);
      font-size: rpx(46) !important;
    }
  }
</style>
