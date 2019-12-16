<template>
  <view class="merchant">
    <view class="cu-form-group">
      <view class="title">商家名称</view>
      <view class="text-grey">{{merchant.name}}</view>
    </view>
    <view class="cu-form-group">
      <view class="title">联系人</view>
      <view class="text-grey">{{merchant.linkMan}}</view>
    </view>
    <view class="cu-form-group" @tap="makePhoneCall(merchant.linkPhone)">
      <view class="title">联系电话</view>
      <view class="text-grey">
        {{merchant.linkPhone}}
        <text class="cuIcon-phone margin-left-xs text-orange"></text>
      </view>
    </view>
    <view class="cu-form-group">
      <view class="title">详细地址</view>
      <view class="text-grey">{{merchant.address}}</view>
    </view>
    <view class="cu-form-group" @tap="makePhoneCall(merchant.servicePhone)">
      <view class="title">客服电话</view>
      <view class="text-grey">
        {{merchant.servicePhone}}
        <text class="cuIcon-phone margin-left-xs text-orange"></text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        merchant: {},
      };
    },
    methods: {
      // 获取商家信息
      async getMerchant() {
        this.merchant = await this.$api.user.getMerchant({ uuid: this.$constants.MERCHANT_UUID }) || {};
      },
      // 拨打电话
      makePhoneCall(phoneNumber) {
        if (phoneNumber) {
          uni.makePhoneCall({ phoneNumber });
        }
      },
    },
    async onLoad() {
      this.getMerchant();
    },
  };
</script>

<style lang="scss">
  .merchant {
  }
</style>
