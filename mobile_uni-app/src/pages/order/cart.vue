<template>
  <view class="cart">
    <goods-list
      :datas.sync="cart"
      :emptyOptions="emptyOptions"
      right="number"
      paddingBottom="100rpx"
      group
      selectable
      removeable
      @change="cartChange"
    >
    </goods-list>
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
        order: {

        },

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
      // 购物车变动自动保存本地
      cartChange() {
        uni.setStorageSync(this.$constants.CART, this.cart);
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
  }
</style>
