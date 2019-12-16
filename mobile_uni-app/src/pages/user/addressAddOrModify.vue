<template>
  <view class="address has-fixed-bottom" :class="{ 'has-fixed-bottom-iphoneX': isIphoneX }">
    <form @submit="saveAddress">
      <view class="cu-form-group">
        <view class="title">店铺</view>
        <input v-model.trim="address.shopName" placeholder="请输入店铺名称"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">收货人</view>
        <input v-model.trim="address.linkMan" placeholder="请输入收货人姓名"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">联系电话</view>
        <input v-model.trim="address.linkPhone" placeholder="请输入手机、固定电话"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">详细地址</view>
        <input v-model.trim="address.address" placeholder="请输入详细地址"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">设为默认地址</view>
        <switch @change="switchChange" :class="address.sysDefault ? 'checked' : ''"
                :checked="address.sysDefault"></switch>
      </view>
      <view class="padding text-gray">
        *联系电话为手机号码或者带区号的电话号码，如：0592-5772210
      </view>
      <view class="cu-bar bg-white shop fixed-bottom"
            :class="{ 'fixed-bottom-iphoneX': isIphoneX }">
        <navigator class="fixed-bottom-navigator bg-gray" open-type="navigateBack">
          <button class="cu-btn bg-gray lg">取消</button>
        </navigator>
        <button class="cu-btn bg-blue lg" formType="submit">保存</button>
      </view>
    </form>
  </view>
</template>

<script>
  export default {
    data() {
      this.isModify = false;
      return {
        address: {
          linkMan: '',
          linkPhone: '',
          shopName: '',
          address: '',
          sysDefault: false,
        },
        nihao: {},
      };
    },
    methods: {
      // 获取地址
      async getAddress(uuid) {
        this.address = await this.$api.address.getAddress({ uuid }) || {};
      },
      // 设为默认地址
      switchChange(e) {
        this.address.sysDefault = e.detail.value;
      },
      // 保存地址
      async saveAddress() {
        const { address, $constants } = this;
        const { linkMan, linkPhone, address: addressDetail } = address;

        if (!linkMan) {
          uni.showToast({ title: '请填写收货人', icon: 'none' });
        } else if (!$constants.TELEPHONE_CELLPHONE_REGEX.test(linkPhone)) {
          uni.showToast({ title: '请填写正确的联系电话', icon: 'none' });
        } else if (!addressDetail) {
          uni.showToast({ title: '请填写详细地址', icon: 'none' });
        } else {
          if (this.isModify) {
            // 保存修改
            await this.$api.address.saveModifyAddress({ address });
          } else {
            // 保存新增
            await this.$api.address.saveNewAddress({ address });
          }

          uni.showToast({ title: '保存成功' });

          setTimeout(() => {
            getApp().globalData.refreshPage = true;
            uni.navigateBack();
          }, 1500);
        }
      },
    },
    onLoad(options) {
      const { uuid } = options;

      uni.setNavigationBarTitle({
        title: uuid ? '修改地址' : '新增地址',
      });

      if (uuid) {
        this.isModify = true;
        this.getAddress(uuid);
      }
    },
  };
</script>

<style lang="scss">
  .address {
  }
</style>
