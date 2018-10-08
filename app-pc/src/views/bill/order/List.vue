<template>
  <div>
    <el-row class="app-view-tools">
      <el-col class="text-right" :span="12" :offset="12">
        <el-button type="primary" icon="el-icon-plus" size="mini" round @click="$router.push({name: 'orderAdd'})">
          新增
        </el-button>
      </el-col>
    </el-row>

    <el-table :data="mx_defaultTableData" size="mini">
      <el-table-column prop="userName" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="linkMan" label="联系人"></el-table-column>
      <el-table-column prop="linkPhone" label="联系电话"></el-table-column>
      <el-table-column prop="servicePhone" label="客服电话"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="180"></el-table-column>
      <el-table-column label="状态" width="60">
        <template slot-scope="scope">
          <span :class="$Constants.ENABLE_STATUS_CLASS[scope.row.enableStatus]">{{$Constants.ENABLE_STATUS[scope.row.enableStatus]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="60" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="$router.push({name: 'merchantEdit', params: {merchantUuid: scope.row.uuid}})">
            编辑
          </el-button>
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
  import { pageMixin, tableMixin } from '../../../utils/mixins';

  export default {
    name: 'orderList',
    mixins: [pageMixin, tableMixin],
    components: {},
    data() {
      return {
        [this.$Constants.REFRESH_DATA_CALLBACK_MAP]: {
          [this.$Constants.MERCHANT]: this.query,
        },
      };
    },
    methods: {
      refreshPage() {
        this.query();
      },
      query() {
        const params = this.mx_getTableParams();

        this.$api.order.query(params).then((res) => {
          this.mx_setTableData(res);
        }).catch(() => {
        });
      },
    },
  };
</script>
