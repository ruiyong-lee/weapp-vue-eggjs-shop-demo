<template>
  <view class="order">
    <view class="cu-bar search bg-white solid-bottom">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input v-model="keywordsLike" confirm-type="search" :adjust-position="false"
               placeholder="订单编号" @confirm="search"></input>
        <view v-if="keywordsLike" class="action cuIcon-roundclosefill text-gray search-clear"
              @tap="keywordsLike = ''"></view>
      </view>
      <view class="action">
        <button class="cu-btn bg-blue shadow-blur round" @tap="search">搜索</button>
      </view>
    </view>
    <scroll-view scroll-x class="bg-white solid-bottom nav" scroll-with-animation :scroll-left="scrollLeft">
      <view class="flex text-center">
        <view class="cu-item flex-sub" :class="index === tabCur  ?'text-blue cur' : ''"
              v-for="(item, index) in ORDER_TABS" :key="index" @tap="tabSelect(index)">
          {{item.label}}
        </view>
      </view>
    </scroll-view>

    <mescroll-uni top="190" :up="upOption" :down="downOption"
                  @down="downCallback" @up="upCallback" @init="mescrollInit">
      <navigator class="bg-white margin-bottom" v-for="(item, index) in orderList" :key="index"
                 :url="'/pages/order/view?uuid=' + item.uuid">
        <view class="cu-bar">
          <view class="action">
            <text class="cuIcon-form text-blue"></text>
            <text class="text-lg text-bold">{{item.billNumber}}</text>
          </view>
          <view class="action text-lg" :class="ORDER_STATUS_CLASS[item.status]">
            {{item.status | formatOrderStautsToCN}}
          </view>
        </view>
        <view class="flex padding-left padding-right">
          <view class="flex-sub text-right lh-1">
            <text>共 {{item.goodsTotalQty}} 件商品</text>
            <text class="margin-left">实付款：￥</text>
            <text class="text-red text-xl text-bold">{{item.paymentAmount}}</text>
          </view>
        </view>
        <view class="flex padding">
          <view class="flex-sub text-right">
            <button v-if="item.status === 'initial'" @tap.stop="cancelBill(index)"
                    class="cu-btn round text-grey line-gray margin-left-sm">取消订单
            </button>
            <button v-if="item.status === 'initial'" @tap.stop="pay(index)"
                    class="cu-btn round text-red line-red margin-left-sm">去支付
            </button>
            <button v-else @tap.stop="beforeOrderAgain(item.uuid)"
                    class="cu-btn round text-black line-black margin-left-sm">再次购买
            </button>
            <button v-if="item.status === 'dispatching'" @tap.stop="completeBill(index)"
                    class="cu-btn round text-red line-red margin-left-sm">确认收货
            </button>
          </view>
        </view>
      </navigator>
    </mescroll-uni>
  </view>
</template>

<script>
  import MescrollUni from '@/lib/mescroll-uni/mescroll-uni.vue';
  import orderMixin from '../../mixins/order';

  export default {
    mixins: [orderMixin],
    components: { MescrollUni },
    data() {
      const { ORDER_TABS, ORDER_STATUS_CLASS } = this.$constants;
      return {
        mescroll: null, // mescroll实例对象
        downOption: {
          auto: false, // 初始化不自动执行下拉刷新
        },
        upOption: {
          empty: {
            tip: '~ 搜索无数据 ~', // 提示
          },
          textNoMore: '已加载所有订单',
        },
        keywordsLike: '',
        tabCur: 0,
        scrollLeft: 0,
        orderList: [],
        ORDER_TABS,
        ORDER_STATUS_CLASS,
      };
    },
    methods: {
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.mescroll = mescroll;
      },
      // 下拉刷新的回调
      downCallback(mescroll) {
        // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
        mescroll.resetUpScroll();
      },
      // 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
      async upCallback(mescroll) {
        const { num: page, size: pageSize } = mescroll;

        if (page === 1) this.orderList = []; // 如果是第一页需手动制空列表

        // 加载数据
        try {
          const { rows = [] } = await this.queryOrderBill(page, pageSize) || {};

          mescroll.endSuccess(rows.length); // 成功的回调,隐藏下拉刷新和上拉加载的状态
          this.orderList = this.orderList.concat(rows); // 追加新数据
        } catch (e) {
          // 失败的回调,隐藏下拉刷新的状态
          mescroll.endErr();
        }
      },
      // 查询订单
      async queryOrderBill(page, pageSize) {
        const { keywordsLike, tabCur, ORDER_TABS } = this;
        return this.$api.order.queryOrderBill({
          filter: {
            keywordsLike,
            status: ORDER_TABS[tabCur].value,
          },
          pagination: { page, pageSize },
        }, { showLoading: false });
      },
      // tab选中
      tabSelect(index) {
        this.tabCur = index;
        this.scrollLeft = (index - 1) * 60;
        this.mescroll.resetUpScroll();
      },
      // 搜索
      search() {
        this.mescroll.resetUpScroll();
      },
      // 再次购买
      async beforeOrderAgain(uuid) {
        const { lines } = await this.$api.order.getOrderBill({ uuid }) || {};
        this.orderAgain(lines);
      },
      // 支付
      pay(index) {
        const { uuid, version } = this.orderList[index] || {};

        uni.showModal({
          title: '提示',
          content: '在线支付暂未实现，暂时只支持线下支付',
          confirmText: '线下支付',
          success: async (res) => {
            if (res.confirm) {
              await this.$api.order.auditBill({ uuid, version });
              uni.showToast({ title: '订单审核成功', icon: 'none' });
              this.afterOperateBill(index, 'audited');
            }
          },
        });
      },
      // 取消订单
      cancelBill(index) {
        const { uuid, version } = this.orderList[index] || {};

        uni.showModal({
          title: '提示',
          content: '确认取消订单？',
          success: async (res) => {
            if (res.confirm) {
              await this.$api.order.cancelBill({ uuid, version });
              uni.showToast({ title: '取消订单成功', icon: 'none' });
              this.afterOperateBill(index, 'canceled');
            }
          },
        });
      },
      // 完成订单
      completeBill(index) {
        const { uuid, version } = this.orderList[index] || {};

        uni.showModal({
          title: '提示',
          content: '确认收货？',
          success: async (res) => {
            if (res.confirm) {
              await this.$api.order.completeBill({ uuid, version });
              uni.showToast({ title: '收货成功', icon: 'none' });
              this.afterOperateBill(index, 'completed');
            }
          },
        });
      },
      // 操作订单之后
      afterOperateBill(index, status) {
        const { tabCur, orderList, ORDER_TABS } = this;
        const { value: tabValue } = ORDER_TABS[tabCur] || {};

        if (orderList.length > 1) {
          // 列表多条，局部刷新状态
          if (tabValue) {
            this.orderList.splice(index, 1);
          } else {
            this.orderList[index].status = status;
          }
        } else {
          // 列表只有一条，重新请求
          this.search();
        }
      },
    },
    onLoad(options) {
      this.tabSelect(Number(options.tabCur || 0));
    },
    onShow() {
      if (getApp().globalData.refreshPage) {
        getApp().globalData.refreshPage = false;
        this.search();
      }
    },
  };
</script>

<style lang="scss">
  .order {
  }
</style>
