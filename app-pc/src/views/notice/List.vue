<template>
  <div>
    <header class="notice-header">
      <i class="iconfont icon-bell notice-header-icon"></i>
      <span class="mr-20 text-middle">消息总数：{{totalCount}}</span>
      <span class="text-middle">
        未读消息：<span class="text-red">{{unreadCount}}</span>
      </span>
    </header>
    <el-table ref="defaultTable" :data="mx_defaultTableData" size="mini"
              @sort-change="mx_handleTableSortChange">
      <el-table-column prop="type" label="标题" width="200">
        <template slot-scope="scope">
          <span class="text-bold">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <span class="badge"
                :class="scope.row.isRead ? 'bg-gray' : 'bg-red'">{{scope.row.isRead ? '已读' : '未读'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="时间" width="200"></el-table-column>
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
    name: 'noticeList',
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
      return {
        totalCount: 0,
        unreadCount: 0,
      };
    },
    sockets: {
      connect() {
        console.log('socket connected');
      },
      disconnect() {
        console.warn('socket disconnect');
      },
      notice(message = {}) {
        const { action } = message.data || {};

        if (action === 'new_order') {
          this.query();
        }
      },
    },
    watch: {
      // eslint-disable-next-line
      '$store.state.isReadAll': function (val) {
        if (val) {
          this.query();
        }
      },
    },
    methods: {
      refreshPage() {
        this.query();
      },
      async query() {
        const params = this.mx_getTableParams();
        const res = await this.$api.notice.query(params);
        const { count = 0, unread = 0 } = res || {};
        this.totalCount = count;
        this.unreadCount = unread;
        this.mx_setTableData(res);
      },
      async readAll() {
        await this.$api.notice.readAll();
        this.$message({ message: '全部标记为已读', type: 'success' });
        this.$store.dispatch('readAll');
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
