<template>
  <div class="home">
    <h3 class="home-title">今日订单</h3>
    <el-card class="status-card">
      <el-row type="flex" :gutter="0" justify="space-around">
        <el-col :span="6" class="border-right-1">
          <div class="status-card-box">
            <icon name="status-initial" class="status-card-box__icon text-red"></icon>
            <div class="status-card-box__title">
              <span>待付款</span>
              <el-progress class="status-card-box__progress" :percentage="50" :show-text="false"
                           color="#FF5B5B"></el-progress>
            </div>
            <span class="status-card-box__value text-red">5</span>
          </div>
        </el-col>
        <el-col :span="6" class="border-right-1">
          <div class="status-card-box">
            <icon name="status-audited" class="status-card-box__icon text-primary"></icon>
            <div class="status-card-box__title">
              <span>待发货</span>
              <el-progress class="status-card-box__progress" :percentage="20" :show-text="false"
                           color="#5C9ACF"></el-progress>
            </div>
            <span class="status-card-box__value text-primary">2</span>
          </div>
        </el-col>
        <el-col :span="6" class="border-right-1">
          <div class="status-card-box">
            <icon name="status-dispatching" class="status-card-box__icon text-green"></icon>
            <div class="status-card-box__title">
              <span>待收货</span>
              <el-progress class="status-card-box__progress" :percentage="20" :show-text="false"
                           color="#1cc09f"></el-progress>
            </div>
            <span class="status-card-box__value text-green">2</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="status-card-box">
            <icon name="status-completed" class="status-card-box__icon text-dark-gray"></icon>
            <div class="status-card-box__title">
              <span>已完成</span>
              <el-progress class="status-card-box__progress" :percentage="10" :show-text="false"
                           color="#666666"></el-progress>
            </div>
            <span class="status-card-box__value text-dark-gray">1</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <h3 class="home-title">近7天订单</h3>
    <el-row type="flex" :gutter="20">
      <el-col :span="12">
        <el-card class="chart-card">
          <div slot="header">订单数</div>
          <ve-line :data="chartOrderQtyData" :settings="chartSettings"
                   :extend="chartOrderQtyExtend" :grid="grid" height="280px"></ve-line>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">订单金额</div>
          <ve-line :data="chartOrderAmountData" :settings="chartSettings"
                   :extend="chartOrderAmountExtend" :grid="grid" height="280px"></ve-line>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" :gutter="20">
      <el-col :span="12">
        <el-card class="chart-card">
          <div slot="header">订购商品数</div>
          <ve-line :data="chartGoodsQtyData" :settings="chartSettings"
                   :extend="chartGoodsQtyExtend" :grid="grid" height="280px"></ve-line>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">收款金额</div>
          <ve-line :data="chartOrderReceiptAmountData" :settings="chartSettings"
                   :extend="chartOrderAmountExtend" :grid="grid" height="280px"></ve-line>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: {},
    data() {
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
      return {
        chartOrderQtyData: {
          columns: ['日期', '数量'],
          rows: [
            { 日期: '05.03', 数量: 8 },
            { 日期: '05.04', 数量: 10 },
            { 日期: '05.05', 数量: 9 },
            { 日期: '05.06', 数量: 11 },
            { 日期: '05.07', 数量: 13 },
            { 日期: '05.08', 数量: 10 },
          ],
        },
        chartOrderAmountData: {
          columns: ['日期', '金额'],
          rows: [
            { 日期: '05.03', 金额: 300 },
            { 日期: '05.04', 金额: 400 },
            { 日期: '05.05', 金额: 320 },
            { 日期: '05.06', 金额: 420 },
            { 日期: '05.07', 金额: 410 },
            { 日期: '05.08', 金额: 400 },
          ],
        },
        chartGoodsQtyData: {
          columns: ['日期', '数量'],
          rows: [
            { 日期: '05.03', 数量: 80 },
            { 日期: '05.04', 数量: 100 },
            { 日期: '05.05', 数量: 90 },
            { 日期: '05.06', 数量: 110 },
            { 日期: '05.07', 数量: 130 },
            { 日期: '05.08', 数量: 100 },
          ],
        },
        chartOrderReceiptAmountData: {
          columns: ['日期', '金额'],
          rows: [
            { 日期: '05.03', 金额: 300 },
            { 日期: '05.04', 金额: 400 },
            { 日期: '05.05', 金额: 320 },
            { 日期: '05.06', 金额: 420 },
            { 日期: '05.07', 金额: 410 },
            { 日期: '05.08', 金额: 400 },
          ],
        },
      };
    },
    created() {
    },
    methods: {},
  };
</script>

<style lang="scss">
  .home {
    .home-title {
      margin-bottom: 20px;
      color: #666666;
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
          width: 36px;
          height: 36px;
        }

        .status-card-box__title {
          display: inline-block;
          margin: 0 20px;
          color: #666666;
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
