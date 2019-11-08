<template>
  <view class="user-view">
    <view class="user-view-header">
      <open-data class="cu-avatar xl round overflow-hidden" type="userAvatarUrl"></open-data>
      <view class="margin-top-lg text-xl">{{user.name}}</view>
      <view class="margin-top-sm">
        <text class="cuIcon-phone margin-right-xs text-lg"></text>
        {{user.mobile}}
      </view>
      <view class="margin-top">
        <view class='cu-tag bg-yellow radius'>{{userType | formatUserTypeToCN}}</view>
        <view v-if="userType === 'DRIVER'" class='cu-tag bg-white radius'>
          {{user.workStatus | formatWorkStautsToCN}}
        </view>
        <view v-if="userType === 'EMPLOYEE'" class='cu-tag bg-white radius'>
          {{user.departmentName}}
        </view>
      </view>
    </view>

    <template v-if="userType === 'DRIVER'">
      <view class="cu-bar bg-white user-view-bar solid-bottom">
        <view class="action">
          <text class="cuIcon-deliver text-yellow"></text>
          <text class="text-xl text-bold lh-1">当前车辆</text>
        </view>
      </view>
      <view class="padding flex text-center text-grey bg-white shadow-normal">
        <view class="flex flex-sub flex-direction solid-right padding-lr-xs overflow-hidden">
          <view class="text-xxl text-orange text-cut">{{user.vehiclePlateNo}}</view>
          <view class="margin-top-sm">
            <text class="cuIcon-newshot margin-right-xs"></text>
            车牌号
          </view>
        </view>
        <view class="flex flex-sub flex-direction solid-right padding-lr-xs overflow-hidden">
          <view class="text-xxl text-blue text-cut">{{user.vehicleTypeName}}</view>
          <view class="margin-top-sm">
            <text class="cuIcon-deliver margin-right-xs"></text>
            车辆类型
          </view>
        </view>
        <view class="flex flex-sub flex-direction padding-lr-xs overflow-hidden">
          <view class="text-xxl text-green text-cut"
                :class="VEHICLE_STATUS_CLASS[user.vehicleStatus]">
            {{user.vehicleStatus | formatVehicleStautsToCN}}
          </view>
          <view class="margin-top-sm">
            <text class="cuIcon-tag margin-right-xs"></text>
            状态
          </view>
        </view>
      </view>

      <view class="cu-bar bg-white user-view-bar solid-bottom margin-top">
        <view class="action">
          <text class="cuIcon-rank text-yellow"></text>
          <text class="text-lg text-bold lh-1">业务统计</text>
        </view>
      </view>
      <view class="padding text-center text-grey text-lg bg-white shadow-normal">
        <view class="flex text-blue">
          <view class="flex-sub flex-direction">-</view>
          <view class="flex-sub flex-direction">工作天</view>
          <view class="flex-sub flex-direction">车次</view>
          <view class="flex-sub flex-direction">收入</view>
        </view>
        <view class="flex margin-top" v-for="item in statistic" :key="item.month">
          <view class="flex-sub flex-direction text-blue">{{item.month}}</view>
          <view class="flex-sub flex-direction">{{item.workDayQty}}</view>
          <view class="flex-sub flex-direction">{{item.transportQty}}</view>
          <view class="flex-sub flex-direction">{{item.incomes}}</view>
        </view>
      </view>

      <view class="cu-bar bg-white user-view-bar solid-bottom margin-top">
        <view class="action">
          <text class="cuIcon-apps text-yellow"></text>
          <text class="text-lg text-bold lh-1">功能</text>
        </view>
      </view>
      <view class="cu-list grid col-3 no-border shadow-normal">
        <view class="cu-item">
          <navigator url="/pages/common/maintenance">
            <view class="cuIcon-repairfill text-red"></view>
            <text>维修保养</text>
          </navigator>
        </view>
        <view class="cu-item">
          <navigator :url="'/pages/common/maintenance?pageType=' + MAINTENANCE_COMPLETE">
            <view class="cuIcon-roundcheckfill text-green"></view>
            <text>修完提车</text>
          </navigator>
        </view>
        <view class="cu-item">
          <navigator url="/pages/bill/add">
            <view class="cuIcon-cartfill text-blue"></view>
            <text>下单</text>
          </navigator>
        </view>
      </view>
    </template>

    <navigator url="/pages/user/login" open-type="reLaunch"
               class="cu-bar bg-white user-view-bar justify-center solid-bottom margin-top margin-bottom">
      <view class="action">
        <text class="cuIcon-exit text-yellow"></text>
        <text class="text-lg text-bold lh-1">退出登录</text>
      </view>
    </navigator>
  </view>
</template>

<script>
  export default {
    data() {
      const { MAINTENANCE_COMPLETE, VEHICLE_STATUS_CLASS } = this.$constants;
      return {
        user: {},
        userType: '',
        statistic: [],
        MAINTENANCE_COMPLETE,
        VEHICLE_STATUS_CLASS,
      };
    },
    methods: {
      // 获取当前用户信息
      async getCurrentUser() {
        const { userType, $constants } = this;

        if (userType === 'DRIVER') {
          this.user = await this.$api.driver.getCurrentUser() || {};
        } else if (userType === 'EMPLOYEE') {
          this.user = uni.getStorageSync($constants.USER);
        } else {
          uni.reLaunch({ url: '/pages/user/login' });
        }
      },
      // 查询司机业务数据报表
      async queryWxaDriverSelfBizStatistic() {
        this.statistic = await this.$api.statistic.queryWxaDriverSelfBizStatistic() || {};
      },
    },
    onLoad() {
      // 获取当前用户类型
      this.userType = uni.getStorageSync(this.$constants.USER_TYPE);
    },
    onShow() {
      this.getCurrentUser();
      this.queryWxaDriverSelfBizStatistic();
    },
  };
</script>

<style lang="scss">
  .user-view {
    .user-view-header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: rpx(400);
      color: $uni-white;
      font-weight: 300;
      overflow: hidden;
      background-image: linear-gradient(0, #1cbbb4, #0081ff);
    }

    .user-view-bar {
      z-index: 1;
    }
  }
</style>
