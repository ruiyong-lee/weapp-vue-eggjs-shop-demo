<template>
  <view class="order has-fixed-bottom" :class="{ 'has-fixed-bottom-iphoneX': isIphoneX }">
    <view v-if="!pending" class="flex justify-center bg-blue padding">
      <view class="text-center">
        <text class="order-status-icon" :class="ORDER_STATUS_ICON[order.status]"></text>
        <text class="order-status text-xl" :class="ORDER_STATUS_CLASS[order.status]">
          {{order.status | formatOrderStautsToCN}}
        </text>
        <view v-if="isInitial" class="margin-top-sm">
          请于 {{countDown}} 内付款，超时订单将自动取消
        </view>
      </view>
    </view>

    <view class="cu-list menu">
      <view class="cu-item" :class="pending ? 'arrow' : ''" @tap="chooseAddress">
        <view v-if="order.addressUuid" class="content padding-tb-sm">
          <view>
            <text class="cuIcon-location text-blue margin-right-xs"></text>
            收货人：{{order.linkMan}}
          </view>
          <view class="text-gray text-sm padding-left-lg">
            收货地址：{{order.address}}
          </view>
        </view>
        <view v-else class="content padding-tb-sm">
          <text class="cuIcon-location text-blue margin-right-xs"></text>
          请选择收货地址
        </view>
      </view>
    </view>

    <view class="cu-bar bg-white solid-bottom margin-top">
      <view class="action">
        <text class="cuIcon-goods"></text>
        <text>商品列表</text>
      </view>
    </view>
    <view class="cu-list menu-avatar">
      <view class="cu-item" v-for="(goods, index) in order.lines" :key="index">
        <view class="cu-avatar lg"
              :style="goods.goodsPic ? 'background-image:url(' + goods.goodsPic + ');' : ''"></view>
        <view class="content">
          <view class="text-cut">
            {{goods.goodsName}}
            <text class="margin-left-xs text-xs">({{goods.unitName}})</text>
          </view>
          <view class="text-cut text-red text-left">￥
            <text class="text-xl">{{goods.salePrice}}</text>
          </view>
        </view>
        <view class="action">
          <text class="text-lg">x {{goods.goodsQty}}</text>
        </view>
      </view>
    </view>

    <view class="cu-list menu margin-top">
      <view class="cu-item" :class="pending ? 'arrow' : ''" @tap="selectDeliveryTimeType">
        <view class="content">送货时间</view>
        <view class="action">
          <text class="text-grey">
            {{order.deliveryTimeTypeUuid ? order.deliveryTimeTypeName + '（' +
            order.deliveryTimeTypeRemark + '）' : '请选择送货时间'}}
          </text>
        </view>
      </view>

      <view class="cu-form-group margin-top">
        <view class="title">备注</view>
        <input v-model="order.remark" :disabled="!pending"
               :placeholder="pending ? '请输入备注' : ''"></input>
      </view>

      <view class="cu-item margin-top">
        <view class="content padding-tb-sm">
          <view class="flex padding-bottom-sm">
            <view class="flex-sub">商品金额</view>
            <view class="flex-sub text-red text-right">￥{{order.totalAmount}}</view>
          </view>
          <view class="flex padding-bottom-sm">
            <view class="flex-sub">
              运费
              <text class="text-sm text-gray">（满¥{{freeFreightAmount}}免运费）</text>
            </view>
            <view class="flex-sub text-red text-right">+ ￥{{order.freightAmount}}</view>
          </view>
          <view class="flex">
            <view class="flex-sub">加急费</view>
            <view class="flex-sub text-red text-right">+ ￥{{order.deliveryTimeTypeSurcharge}}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!--底部-->
    <view class="cu-bar bg-white shop fixed-bottom"
          :class="{ 'fixed-bottom-iphoneX': isIphoneX }">
      <view v-if="pending" class="flex order-footer-pending">
        <text class="text-red">￥
          <text class="text-xxl text-bold">{{order.paymentAmount}}</text>
        </text>
        <button class="cu-btn bg-red round shadow-blur" :disabled="createBillBtnDisabled"
                @tap="createBill">提交订单
        </button>
      </view>
      <view v-else class="flex order-footer">
        <button v-if="isInitial" @tap="cancelBill"
                class="cu-btn round text-grey line-gray margin-left-sm">取消订单
        </button>
        <button v-if="isInitial" @tap="pay"
                class="cu-btn round text-red line-red margin-left-sm">去支付
        </button>
        <button v-else @tap="orderAgain(order.lines)"
                class="cu-btn round text-black line-black margin-left-sm">再次购买
        </button>
        <button v-if="order.status === 'dispatching'" @tap="completeBill"
                class="cu-btn round text-red line-red margin-left-sm">确认收货
        </button>
      </view>
    </view>
  </view>
</template>

<script>
  import orderMixin from '../../mixins/order';

  export default {
    mixins: [orderMixin],
    components: {},
    data() {
      const { ORDER_STATUS_ICON, ORDER_STATUS_CLASS } = this.$constants;
      this.timer = null; // 定时器
      return {
        order: {},
        goodsList: [],
        countDown: '',
        freeFreightAmount: 0,
        deliveryTimeTypeList: [],
        deliveryTimeTypeOptions: [],
        pending: false,
        createBillBtnDisabled: true,
        ORDER_STATUS_ICON,
        ORDER_STATUS_CLASS,
      };
    },
    computed: {
      isInitial() {
        return this.order.status === 'initial';
      },
      isIphoneX: () => uni.isIphoneX,
    },
    methods: {
      // 获取订单
      async get(uuid) {
        const res = await this.$api.order.getOrderBill({ uuid }) || {};
        this.order = res;
        this.goodsList = [res];
        if (res.status === 'initial') {
          this.getCountDown(res.createdTime, uuid);
        }
      },
      // 倒计时
      getCountDown(createdTime, uuid) {
        const startTime = this.$util.convertStrToDate(createdTime).getTime();
        const nowTime = new Date().getTime();
        const countDown = this.$util.formatCountDown(nowTime - startTime);

        this.countDown = countDown || '0分0秒';

        if (countDown) {
          this.timer = setTimeout(() => {
            this.getCountDown(createdTime, uuid);
          }, 1000);
        } else {
          clearTimeout(this.timer);
          this.order.status = 'canceled'; // 暂时这么处理，后面会优化
        }
      },
      // 取消订单
      cancelBill() {
        const { uuid, version } = this.order || {};

        uni.showModal({
          title: '提示',
          content: '确认取消订单？',
          success: async (res) => {
            if (res.confirm) {
              await this.$api.order.cancelBill({ uuid, version });
              uni.showToast({ title: '取消订单成功', icon: 'none' });
              getApp().globalData.refreshPage = true;
              this.get(uuid);
            }
          },
        });
      },
      // 完成订单
      completeBill() {
        const { uuid, version } = this.order || {};

        uni.showModal({
          title: '提示',
          content: '确认收货？',
          success: async (res) => {
            if (res.confirm) {
              await this.$api.order.completeBill({ uuid, version });
              uni.showToast({ title: '收货成功', icon: 'none' });
              getApp().globalData.refreshPage = true;
              this.get(uuid);
            }
          },
        });
      },
      // 提交订单
      async createBill() {
        const { addressUuid, deliveryTimeTypeUuid } = this.order || {};

        if (!addressUuid) {
          uni.showToast({ title: '请先选择收货地址', icon: 'none' });
          return;
        }
        if (!deliveryTimeTypeUuid) {
          uni.showToast({ title: '请先选择送货时间', icon: 'none' });
          return;
        }

        const uuid = await this.$api.order.createBill({ goodsOrder: this.order });
        uni.showToast({ title: '提交成功', icon: 'none' });
        this.pending = false;
        this.removeCart();
        await this.get(uuid);
        this.pay();
      },
      // 移除购物车中已下单的商品
      removeCart() {
        const cart = uni.getStorageSync(this.$constants.CART) || {};

        Object.keys(cart).forEach((key) => {
          const { lines = {} } = cart[key];
          Object.keys(lines).forEach((goodsKey) => {
            const goods = lines[goodsKey] || {};
            const { checked } = goods;
            if (checked) {
              this.$delete(lines, goodsKey); // 移除商品
            }
          });

          // 类别下没有商品直接移除类别
          if (Object.keys(lines).length === 0) {
            this.$delete(cart, key);
          }
        });
        uni.setStorageSync(this.$constants.CART, cart);
      },
      // 支付
      pay() {
        const { uuid, version } = this.order || {};

        uni.showModal({
          title: '提示',
          content: '在线支付暂未实现，暂时只支持线下支付',
          confirmText: '线下支付',
          success: async (res) => {
            if (res.confirm) {
              await this.$api.order.auditBill({ uuid, version });
              uni.showToast({ title: '订单审核成功', icon: 'none' });
              getApp().globalData.refreshPage = true;
              this.get(uuid);
            }
          },
        });
      },
      // 刷新地址,如果上次有选择地址，则使用该地址，否则使用默认地址
      refreshAddress() {
        const addressSelected = uni.getStorageSync(this.$constants.ADDRESS);

        if (this.$util.isEmpty(addressSelected)) {
          this.getDefaultAddress();
        } else {
          this.setAddress(addressSelected);
        }
      },
      // 选择地址
      async chooseAddress() {
        if (this.pending) {
          uni.navigateTo({ url: `/pages/user/address?uuid=${this.order.addressUuid}&mode=select` });
        }
      },
      // 获取默认地址
      async getDefaultAddress() {
        const res = await this.$api.address.getDefaultAddress() || {};
        this.setAddress(res);
      },
      // 设置地址
      setAddress(data = {}) {
        this.$set(this.order, 'linkMan', data.linkMan);
        this.$set(this.order, 'linkPhone', data.linkPhone);
        this.$set(this.order, 'address', data.address);
        this.$set(this.order, 'addressUuid', data.uuid);
      },
      // 获取收货时间列表
      async getDeliveryTimeType() {
        const res = await this.$api.deliveryTimeType.getDeliveryTimeTypeList() || [];
        this.deliveryTimeTypeList = res;
        this.deliveryTimeTypeOptions = res.map((item, index) => {
          if (index === 0) {
            this.setDeliveryTimeType(item);
          }
          return `${item.name}（${item.remark}）`;
        });
      },
      // 选择收货时间
      selectDeliveryTimeType() {
        if (this.pending) {
          uni.showActionSheet({
            itemList: this.deliveryTimeTypeOptions,
            success: (res) => {
              if (!res.cancel) {
                const item = this.deliveryTimeTypeList[res.tapIndex];
                this.setDeliveryTimeType(item);
              }
            },
          });
        }
      },
      // 设置收货时间
      setDeliveryTimeType(data = {}) {
        this.$set(this.order, 'deliveryTimeTypeUuid', data.uuid);
        this.$set(this.order, 'deliveryTimeTypeName', data.name);
        this.$set(this.order, 'deliveryTimeTypeRemark', data.remark);
        this.$set(this.order, 'deliveryTimeTypeSurcharge', data.surcharge);
        this.calculatePaymentAmount();
      },
      // 获取默认运费方案
      async getDefaultFreightPlan() {
        const { totalAmount = 0 } = this.order || {};
        const { basicFreight, freeFreightAmount } = await this.$api.freightPlan.getDefaultFreightPlan() || [];

        this.$set(this.order, 'freightAmount', totalAmount >= freeFreightAmount ? 0 : basicFreight);
        this.freeFreightAmount = freeFreightAmount;
        this.createBillBtnDisabled = false;
        this.calculatePaymentAmount();
      },
      // 计算总金额
      calculatePaymentAmount() {
        const { round, sum } = this.$util;
        const { totalAmount = 0, freightAmount = 0, deliveryTimeTypeSurcharge = 0 } = this.order || {};
        const paymentAmount = round(sum([Number(totalAmount), Number(freightAmount), Number(deliveryTimeTypeSurcharge)]), 2);
        this.$set(this.order, 'paymentAmount', paymentAmount);
      },
    },
    async onLoad(options) {
      const { uuid } = options;

      if (uuid) {
        // 已提交订单
        await this.get(uuid);
      } else {
        // 待提交订单
        this.pending = true;
        this.order = getApp().globalData.order;
        this.getDeliveryTimeType();
        this.getDefaultFreightPlan();
      }

      this.$set(this.order, 'remark', this.order.remark || '');
    },
    onShow() {
      if (this.pending) {
        this.refreshAddress();
      }
    },
    onUnload() {
      clearTimeout(this.timer);
    },
  };
</script>

<style lang="scss">
  .order {
    &-status-icon {
      margin-right: rpx(25);
      font-size: rpx(46);
      vertical-align: middle;
      color: $uni-white !important;
    }

    &-status {
      vertical-align: middle;
      color: $uni-white !important;
    }

    &-footer {
      width: 100%;
      justify-content: flex-end;
    }

    &-footer-pending {
      width: 100%;
      align-items: center;
      justify-content: space-between;
      overflow: visible;
    }
  }
</style>
