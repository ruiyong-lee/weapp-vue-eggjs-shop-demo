<template>
  <div>
    <el-row class="app-view-tools">
      <el-col class="text-right" :span="12" :offset="12">
        <el-button type="primary" icon="el-icon-plus" size="mini" round @click="$router.push({name: 'merchantAdd'})">
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
      <el-table-column prop="createdTime" label="创建时间" width="180">
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
    methods: {
      initTable() {
        this.query();
      },
      query() {
        const params = this.mx_getTargetTableParams();

        this.$api.queryMechant(params).then((res) => {
          this.mx_initTableData(res);
        }).catch(() => {
        });
      },
    },
  };
</script>
