<template>
  <div>
    <el-table :data="mx_defaultTableData" size="mini">
      <el-table-column label="单号/下单时间">
        <template slot-scope="scope">
          <router-link class="text-bold" :to="{name: 'orderView', params: { uuid: scope.row.uuid }}">
            {{scope.row.billNumber}}
          </router-link>
          <p class="text-gray lh-1">{{scope.row.createdTime}}</p>
        </template>
      </el-table-column>
      <el-table-column label="客户">
        <template slot-scope="scope">
          <p>{{scope.row.customerName}}</p>
          <p class="text-gray lh-1">{{scope.row.linkMan}}（{{scope.row.linkPhone}}）</p>
        </template>
      </el-table-column>
      <el-table-column label="商品金额" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.paymentAmount" class="text-red text-bold">{{scope.row.paymentAmount}} 元</span>
        </template>
      </el-table-column>
      <el-table-column prop="deliveryTimeTypeName" label="交货时间" align="center"></el-table-column>
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <span
            :class="$Constants.ORDER_STATUS_CLASS[scope.row.status]">{{$Constants.ORDER_STATUS[scope.row.status]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" fixed="right" width="60" align="center">
        <!--<template slot-scope="scope">-->
          <!--<el-button-->
            <!--type="text"-->
            <!--size="mini"-->
            <!--@click="$router.push({name: 'merchantEdit', params: {merchantUuid: scope.row.uuid}})">-->
            <!--编辑-->
          <!--</el-button>-->
        <!--</template>-->
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
  import { pageMixin, tableMixin } from '../../../utils/mixins';

  export default {
    name: 'orderList',
    mixins: [pageMixin, tableMixin],
    components: {},
    data() {
      return {};
    },
    methods: {
      refreshPage() {
        this.query();
      },
      async query() {
        const params = this.mx_getTableParams();
        const res = await this.$api.order.query(params);
        this.mx_setTableData(res);
      },
    },
  };
</script>
