<template>
  <div>
    <el-form class="filter-form" :inline="true" ref="filterForm" :model="filter" size="mini" @submit.native.prevent>
      <el-form-item label="关键字" prop="keywordsLike">
        <el-input v-model.trim="filter.keywordsLike" placeholder="单号 / 客户名称"
                  clearable @keyup.enter.native="query"></el-input>
      </el-form-item>
      <el-form-item label="下单日期" prop="daterange">
        <el-date-picker
          v-model="filter.daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="filter.status" placeholder="状态" clearable>
          <el-option v-for="(label, key) in $Constants.ORDER_STATUS" :key="key" :label="label" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button @click="mx_resetTable()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table ref="defaultTable" :data="mx_defaultTableData" size="mini" @sort-change="mx_handleTableSortChange">
      <el-table-column prop="createdTime" label="单号 / 下单时间" sortable="custom">
        <template slot-scope="scope">
          <router-link class="text-bold" :to="{name: 'orderView', params: { orderUuid: scope.row.uuid }}">
            {{scope.row.billNumber}}
          </router-link>
          <p class="text-gray lh-1">{{scope.row.createdTime}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="customerName" label="客户" sortable="custom">
        <template slot-scope="scope">
          <p>{{scope.row.customerName}}</p>
          <p class="text-gray lh-1">{{scope.row.linkMan}}（{{scope.row.linkPhone}}）</p>
        </template>
      </el-table-column>
      <el-table-column prop="paymentAmount" label="商品金额" sortable="custom">
        <template slot-scope="scope">
          <span v-if="scope.row.paymentAmount" class="text-red text-bold">¥ {{scope.row.paymentAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="deliveryTimeTypeName" label="交货时间" align="center"></el-table-column>
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <span class="badge"
                :class="scope.row.status | formatOrderStatusToClass">{{scope.row.status | formatOrderStatusToCN}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" fixed="right" width="80" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 'audited'" type="text" size="mini" @click="dispatch(scope.row)">开始配送
          </el-button>
          <el-button v-else-if="scope.row.status === 'dispatching'" type="text" size="mini"
                     @click="complete(scope.row)">完成
          </el-button>
          <span v-else>--</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      :totalCount="mx_defaultPagination.count"
      :currentPage.sync="mx_defaultPagination.page"
      :pageSize.sync="mx_defaultPagination.pageSize"
      :pageSizes="mx_defaultPagination.pageSizes"
      @handlePageChange="query">
    </pagination>
  </div>
</template>

<script>
  import { pageMixin, tableMixin } from '../../../utils/mixins/common';
  import orderMixin from '../../../utils/mixins/order';

  export default {
    name: 'orderList',
    mixins: [pageMixin, tableMixin, orderMixin],
    components: {},
    data() {
      return {
        filter: {
          keywordsLike: '',
          daterange: [],
          status: '',
        },
      };
    },
    methods: {
      refreshPage() {
        this.query();
      },
      async query() {
        const params = this.mx_getTableParams();
        params.filter = this.filter;
        const res = await this.$api.order.query(params);
        this.mx_setTableData(res);
      },
    },
  };
</script>
