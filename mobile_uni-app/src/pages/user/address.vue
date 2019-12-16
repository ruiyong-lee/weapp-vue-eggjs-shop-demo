<template>
  <view class="order has-fixed-bottom" :class="{ 'has-fixed-bottom-iphoneX': isIphoneX }">
    <view class="cu-list menu">
      <view class="cu-item" :class="{ 'move-cur': touchIndex === index }"
            v-for="(item, index) in addressList" :key="index" @tap="selectAddress(item)"
            @touchstart="itemTouchStart" @touchmove="itemTouchMove" @touchend="itemTouchEnd(index)">
        <text v-if="selectedAddressUuid === item.uuid"
              class="address-select cuIcon-roundcheckfill text-red"></text>
        <view class="content padding-tb-sm">
          <view>
            {{item.linkMan}} {{item.linkPhone}}
            <text v-if="item.sysDefault" class='cu-tag radius sm bg-red margin-left'>默认</text>
          </view>
          <view class="text-gray text-sm">{{item.address}}</view>
        </view>
        <navigator class="address-modify cuIcon-write"
                   :url="'/pages/user/addressAddOrModify?uuid=' + item.uuid"></navigator>
        <view class="move">
          <view v-if="!item.sysDefault" class="bg-grey" @tap="setDefaultAddress(index)">设为默认</view>
          <view class="bg-red" @tap="deleteAddress(index)">删除</view>
        </view>
      </view>
    </view>

    <!--底部-->
    <view class="cu-bar bg-white shop fixed-bottom"
          :class="{ 'fixed-bottom-iphoneX': isIphoneX }">
      <navigator class="fixed-bottom-navigator bg-blue shadow-blur"
                 url="/pages/user/addressAddOrModify">
        <button class="cu-btn bg-blue">新增地址</button>
      </navigator>
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    data() {
      this.isSelectMode = false; // 是否是选择模式
      return {
        addressList: [],
        selectedAddressUuid: null,
        touchIndex: null, // 触摸对象的key
        touchStartX: 0, // 触摸开始位置
        touchDirection: null, // 触摸方向
      };
    },
    computed: {
      isIphoneX: () => uni.isIphoneX,
    },
    methods: {
      // 获取地址列表
      async getAddressList() {
        this.addressList = await this.$api.address.getAddressList() || [];
      },
      // 选择地址
      selectAddress(address) {
        if (this.isSelectMode) {
          uni.setStorageSync(this.$constants.ADDRESS, address);
          uni.navigateBack();
        }
      },
      // 删除地址
      deleteAddress(index) {
        const { uuid } = this.addressList[index] || {};

        uni.showModal({
          title: '提示',
          content: '确认删除地址？',
          success: async (res) => {
            if (res.confirm) {
              await this.$api.address.deleteAddress({ uuid });
              uni.showToast({ title: '删除地址成功', icon: 'none' });
              this.getAddressList();
            }
          },
        });
      },
      // 设置默认地址
      async setDefaultAddress(index) {
        const { uuid } = this.addressList[index] || {};

        await this.$api.address.setDefaultAddress({ uuid });
        uni.showToast({ title: '设置默认地址成功', icon: 'none' });
        this.getAddressList();
      },
      // 触摸开始
      itemTouchStart(e) {
        this.touchStartX = e.touches[0].pageX;
      },
      // 计算方向
      itemTouchMove(e) {
        this.touchDirection = e.touches[0].pageX - this.touchStartX > 0 ? 'right' : 'left';
      },
      // 计算滚动
      itemTouchEnd(index) {
        if (this.touchDirection === 'left') {
          this.touchIndex = index;
        } else {
          this.touchIndex = null;
        }
        this.touchDirection = null;
      },
    },
    async onLoad(options) {
      this.isSelectMode = options.mode === 'select';
      this.selectedAddressUuid = options.uuid;
      this.getAddressList();
    },
    onShow() {
      if (getApp().globalData.refreshPage) {
        getApp().globalData.refreshPage = false;
        this.getAddressList();
      }
    },
  };
</script>

<style lang="scss">
  .address {
    &-select {
      padding-right: rpx(20);
      font-size: rpx(46) !important;
    }

    &-modify {
      padding: rpx(20);
      font-size: rpx(36) !important;
      border-radius: 50%;
    }
  }
</style>
