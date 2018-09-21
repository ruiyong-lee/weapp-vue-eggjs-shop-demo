<template>
  <div>
    <el-row class="app-view-tools">
      <el-col class="text-right" :span="12" :offset="12">
        <el-button type="primary" icon="el-icon-plus" size="mini" round @click="$router.push({name: 'merchantAdd'})">
          新增
        </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="mx_defaultTableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <el-pagination
      class="app-pagination"
      :current-page="mx_defaultPagination.page"
      :page-sizes="mx_defaultPagination.pageSizes"
      :page-size="mx_defaultPagination.pageSize"
      :layout="mx_defaultPagination.layout"
      :total="mx_defaultPagination.count"
      @current-change="mx_handlePageChange"
      @size-change="mx_handlePageSizeChange">
    </el-pagination>
  </div>
</template>

<script>
  import { pageMixin, tableMixin } from '../../utils/mixins';

  export default {
    name: 'merchantList',
    mixins: [pageMixin, tableMixin],
    components: {},
    data() {
      return {};
    },
    mounted() {
    },
  };
</script>
