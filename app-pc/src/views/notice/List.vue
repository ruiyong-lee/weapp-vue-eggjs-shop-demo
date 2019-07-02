<template>
  <div>
    <header class="notice-header">
      <icon name="bell" class="notice-header-icon"></icon>
      <span class="mr-20 text-middle">消息总数：20</span>
      <span class="text-middle">未读消息：18</span>
    </header>
    <el-table ref="defaultTable" :data="mx_defaultTableData" size="mini" @sort-change="mx_handleTableSortChange">
      <el-table-column prop="type" label="类型" width="200">
        <template slot-scope="scope">
          <span class="text-bold">{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="createTime" label="时间" width="200"></el-table-column>
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
  import { pageMixin, tableMixin } from '../../utils/mixins/common';

  export default {
    name: 'freightPlanList',
    mixins: [pageMixin, tableMixin],
    components: {},
    data() {
      this[this.$Constants.APP_PAGE_TOOLS] = [
        {
          icon: 'el-icon-view',
          content: '全部标记为已读',
          callback: this.readAll,
          type: 'primary',
        },
      ];
      return {};
    },
    methods: {
      refreshPage() {
        this.query();
      },
      async query() {
        const params = this.mx_getTableParams();
        const res = await this.$api.freightPlan.query(params);
        this.mx_setTableData(res);
      },
      async readAll(uuid) {
        await this.$api.freightPlan.remove({ uuid });
        this.$message({ message: '全部标记为已读', type: 'success' });
        this.query();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .notice-header {
    margin-bottom: 15px;
    font-size: 16px;
    line-height: 22px;
    overflow: hidden;

    .notice-header-icon {
      margin-right: 15px;
      font-size: 24px;
      color: #FAAD14;
      vertical-align: middle;
    }
  }

  .notice-body {
    .notice-body-table {
      background-color: $--color-white;
    }
  }
</style>
