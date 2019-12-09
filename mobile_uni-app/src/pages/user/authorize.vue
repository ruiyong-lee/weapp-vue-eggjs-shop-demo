<template>
  <view class="authorize">
    <view class="text-center">
      <view class="text-xl text-bold margin-bottom">申请获得以下权限</view>
      <view class="margin-bottom">获得您的公开信息（昵称、头像等）</view>
      <button class="authorize-btn cu-btn bg-green lg shadow round"
              open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
        <text class="cuIcon-weixin"></text>
        <text class="authorize-btn-text">确认授权</text>
      </button>
    </view>
  </view>
</template>

<script>
  export default {
    methods: {
      bindGetUserInfo(e) {
        getApp().globalData.userInfo = e.detail.userInfo;
        uni.reLaunch({ url: '/pages/index/index' });
      },
    },
  };
</script>

<style lang="scss">
  .authorize {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: $uni-white;

    .authorize-btn {
      width: rpx(480);
      height: rpx(100);
      font-size: rpx(36);

      .cuIcon-weixin {
        margin-right: rpx(10);
        font-size: rpx(46);
        vertical-align: middle;
      }

      .authorize-btn-text {
        vertical-align: middle;
      }
    }
  }
</style>
