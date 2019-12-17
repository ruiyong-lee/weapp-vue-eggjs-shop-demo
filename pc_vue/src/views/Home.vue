<template>
  <div class="home">
    <h3 class="home-title">今日订单</h3>
    <el-card class="status-card">
      <el-row type="flex" :gutter="0" justify="space-around">
        <el-col :span="6" class="border-right-1">
          <div class="status-card-box">
            <i class="iconfont icon-initial status-card-box__icon text-red"></i>
            <div class="status-card-box__title">
              <span>待付款</span>
              <el-progress class="status-card-box__progress" :percentage="initialPercentage"
                           :show-text="false"
                           color="#FF5B5B"></el-progress>
            </div>
            <span class="status-card-box__value text-red">{{statusQtyMap.initial || 0}}</span>
          </div>
        </el-col>
        <el-col :span="6" class="border-right-1">
          <div class="status-card-box">
            <i class="iconfont icon-audited status-card-box__icon text-primary"></i>
            <div class="status-card-box__title">
              <span>待发货</span>
              <el-progress class="status-card-box__progress" :percentage="auditedPercentage"
                           :show-text="false"
                           color="#5C9ACF"></el-progress>
            </div>
            <span class="status-card-box__value text-primary">{{statusQtyMap.audited || 0}}</span>
          </div>
        </el-col>
        <el-col :span="6" class="border-right-1">
          <div class="status-card-box">
            <i class="iconfont icon-dispatching status-card-box__icon text-green"></i>
            <div class="status-card-box__title">
              <span>待收货</span>
              <el-progress class="status-card-box__progress" :percentage="dispatchingPercentage"
                           :show-text="false"
                           color="#1cc09f"></el-progress>
            </div>
            <span class="status-card-box__value text-green">{{statusQtyMap.dispatching || 0}}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="status-card-box">
            <i class="iconfont icon-completed status-card-box__icon text-dark-gray"></i>
            <div class="status-card-box__title">
              <span>已完成</span>
              <el-progress class="status-card-box__progress" :percentage="completedPercentage"
                           :show-text="false"
                           color="#666666"></el-progress>
            </div>
            <span
              class="status-card-box__value text-dark-gray">{{statusQtyMap.completed || 0}}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <h3 class="home-title">近7天订单</h3>
    <el-row type="flex" :gutter="20">
      <el-col :span="12">
        <el-card class="chart-card">
          <div slot="header">订单数</div>
          <ve-line :data="chartOrderQtyData" :settings="chartSettings" :extend="chartOrderQtyExtend"
                   ref="chartOrderQty" :grid="grid" :height="chartHeight"></ve-line>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">订单金额</div>
          <ve-line :data="chartOrderAmountData" :settings="chartSettings"
                   :extend="chartOrderAmountExtend"
                   ref="chartOrderAmount" :grid="grid" :height="chartHeight"></ve-line>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" :gutter="20">
      <el-col :span="12">
        <el-card class="chart-card">
          <div slot="header">订购商品数</div>
          <ve-line :data="chartGoodsQtyData" :settings="chartSettings" :extend="chartGoodsQtyExtend"
                   ref="chartGoodsQty" :grid="grid" :height="chartHeight"></ve-line>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">收款金额</div>
          <ve-line :data="chartOrderReceiptAmountData" :settings="chartSettings"
                   :extend="chartOrderAmountExtend"
                   ref="chartOrderReceiptAmount" :grid="grid" :height="chartHeight"></ve-line>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { pageMixin } from '../utils/mixins/common';

  export default {
    name: 'home',
    mixins: [pageMixin],
    components: {},
    data() {
      const { REFRESH_DATA_CALLBACK_MAP, ORDER } = this.$Constants;
      this[REFRESH_DATA_CALLBACK_MAP] = {
        [ORDER]: this.refreshPage,
      };
      this.chartSettings = {
        area: true,
      };
      this.chartOrderQtyExtend = {
        legend: {
          show: false,
        },
        series: {
          smooth: false,
          itemStyle: {
            color: '#5C9ACF',
            borderWidth: 2,
          },
          areaStyle: {
            color: '#5C9ACF',
            opacity: 0.1,
          },
        },
      };
      this.chartOrderAmountExtend = {
        legend: {
          show: false,
        },
        series: {
          smooth: false,
          itemStyle: {
            color: '#FF5B5B',
            borderWidth: 2,
          },
          areaStyle: {
            color: '#FF5B5B',
            opacity: 0.1,
          },
        },
      };
      this.chartGoodsQtyExtend = {
        legend: {
          show: false,
        },
        series: {
          smooth: false,
          itemStyle: {
            color: '#1cc09f',
            borderWidth: 2,
          },
          areaStyle: {
            color: '#1cc09f',
            opacity: 0.1,
          },
        },
      };
      this.grid = {
        top: 20,
        bottom: 0,
        left: 0,
      };
      this.chartHeight = '280px';
      return {
        statusQtyMap: {},
        chartOrderQtyData: {
          columns: ['日期', '数量'],
          rows: [],
        },
        chartOrderAmountData: {
          columns: ['日期', '金额'],
          rows: [],
        },
        chartGoodsQtyData: {
          columns: ['日期', '数量'],
          rows: [],
        },
        chartOrderReceiptAmountData: {
          columns: ['日期', '金额'],
          rows: [],
        },
      };
    },
    watch: {
      // eslint-disable-next-line
      '$store.state.isCollapse': function () {
        // 侧边栏展开或收起，重新调整图表宽度，延迟300ms，也就是等待动画时间
        setTimeout(() => {
          this.$refs.chartOrderQty.echarts.resize();
          this.$refs.chartOrderAmount.echarts.resize();
          this.$refs.chartGoodsQty.echarts.resize();
          this.$refs.chartOrderReceiptAmount.echarts.resize();
        }, 300);
      },
    },
    computed: {
      initialPercentage() {
        const { initial = 0, total = 0 } = this.statusQtyMap;
        return _.round((initial * 100) / total, 0) || 0;
      },
      auditedPercentage() {
        const { audited = 0, total = 0 } = this.statusQtyMap;
        return _.round((audited * 100) / total, 0) || 0;
      },
      dispatchingPercentage() {
        const { dispatching = 0, total = 0 } = this.statusQtyMap;
        return _.round((dispatching * 100) / total, 0) || 0;
      },
      completedPercentage() {
        const { completed = 0, total = 0 } = this.statusQtyMap;
        return _.round((completed * 100) / total, 0) || 0;
      },
    },
    methods: {
      refreshPage() {
        this.getForDay();
        this.getForWeek();
      },
      async getForDay() {
        this.statusQtyMap = await this.$api.statistics.order.getForDay() || {};
      },
      async getForWeek() {
        const chartOrderQtyDataRows = [];
        const chartOrderAmountDataRows = [];
        const chartGoodsQtyDataRows = [];
        const chartOrderReceiptAmountDataRows = [];
        const res = await this.$api.statistics.order.getForWeek() || {};

        Object.entries(res).forEach((item) => {
          const { 0: day, 1: obj = {} } = item;
          const {
            goodsTotalQty = 0, paymentAmount = 0, totalAmount = 0, orderQty = 0,
          } = obj;
          chartOrderQtyDataRows.push({ 日期: day, 数量: orderQty });
          chartOrderAmountDataRows.push({ 日期: day, 金额: totalAmount });
          chartGoodsQtyDataRows.push({ 日期: day, 数量: goodsTotalQty });
          chartOrderReceiptAmountDataRows.push({ 日期: day, 金额: paymentAmount });
        });

        this.chartOrderQtyData.rows = chartOrderQtyDataRows;
        this.chartOrderAmountData.rows = chartOrderAmountDataRows;
        this.chartGoodsQtyData.rows = chartGoodsQtyDataRows;
        this.chartOrderReceiptAmountData.rows = chartOrderReceiptAmountDataRows;
      },
    },
  };
</script>

<style lang="scss">
  .home {
    .home-title {
      margin-bottom: 20px;
      color: $--color-dark-gray;
      font-size: 20px;
      font-weight: bold;

      &:not(:first-child) {
        margin-top: 30px;
      }
    }

    .status-card {
      .el-card__body {
        padding: 20px 0;
      }

      .status-card-box {
        padding: 20px;
        text-align: center;

        .status-card-box__icon {
          font-size: 36px;
          vertical-align: middle;
        }

        .status-card-box__title {
          display: inline-block;
          margin: 0 20px;
          color: $--color-dark-gray;
          min-width: 4em;
          vertical-align: middle;
        }

        .status-card-box__progress {
          margin-top: 15px;
        }

        .status-card-box__value {
          font-size: 24px;
          font-weight: bold;
          vertical-align: middle;
        }
      }
    }

    .chart-card {
      margin-bottom: 20px;
    }
  }
</style>
