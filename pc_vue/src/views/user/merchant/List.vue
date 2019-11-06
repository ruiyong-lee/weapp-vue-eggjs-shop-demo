<template>
  <div>
    <el-form class="filter-form" :inline="true" ref="filterForm" :model="filter" size="mini" @submit.native.prevent>
      <el-form-item label="关键字" prop="keywordsLike">
        <el-input v-model.trim="filter.keywordsLike" placeholder="账号 / 姓名 / 联系人 / 联系电话 / 客服电话"
                  clearable @keyup.enter.native="query"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="filter.status" placeholder="状态" clearable>
          <el-option v-for="(label, key) in $Constants.ENABLE_STATUS" :key="key" :label="label"
                     :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button @click="mx_resetTable()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="defaultTable" :data="mx_defaultTableData" size="mini" @sort-change="mx_handleTableSortChange">
      <el-table-column prop="userName" sortable="custom" label="账号"></el-table-column>
      <el-table-column prop="name" sortable="custom" label="姓名"></el-table-column>
      <el-table-column prop="linkMan" sortable="custom" label="联系人"></el-table-column>
      <el-table-column prop="linkPhone" sortable="custom" label="联系电话"></el-table-column>
      <el-table-column prop="servicePhone" sortable="custom" label="客服电话"></el-table-column>
      <el-table-column prop="createdTime" sortable="custom" label="创建时间" width="180"></el-table-column>
      <el-table-column label="状态" width="60">
        <template slot-scope="scope">
          <span :class="scope.row.enableStatus | formatEnableStatusToClass">{{scope.row.enableStatus | formatEnableStatusToCN}}</span>
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
  import { pageMixin, tableMixin } from '../../../utils/mixins/common';

  export default {
    name: 'merchantList',
    mixins: [pageMixin, tableMixin],
    components: {},
    data() {
      const { REFRESH_DATA_CALLBACK_MAP, MERCHANT, APP_PAGE_TOOLS } = this.$Constants;
      this[REFRESH_DATA_CALLBACK_MAP] = {
        [MERCHANT]: this.query,
      };
      this[APP_PAGE_TOOLS] = [
        {
          icon: 'el-icon-plus',
          content: '新增',
          callback: () => this.$router.push({ name: 'merchantAdd' }),
          type: 'primary',
        },
      ];
      return {
        filter: {
          keywordsLike: '',
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
        const res = await this.$api.merchant.query(params);
        this.mx_setTableData(res);
      },
    },
  };
</script>
