// 混合
import { mapState } from 'vuex';

// page
export const pageMixin = {
  data() {
    return {};
  },
  created() {
    this.mx_setAppPageToolsMap();
    return _.isFunction(this.refreshPage) && this.refreshPage();
  },
  activated() {
    const refreshDataCallbackMap = this[this.$Constants.REFRESH_DATA_CALLBACK_MAP];

    // keep-alive的页面激活后判断是否需要局部刷新数据
    if (!_.isEmpty(refreshDataCallbackMap)) {
      Object.entries(refreshDataCallbackMap).forEach((item) => {
        const key = item[0];
        const callback = item[1];
        const refreshDataMap = _.cloneDeep(this.mx_refreshDataMap);
        const keepAliveNames = refreshDataMap[key] || [];
        const index = keepAliveNames.indexOf(this.$route.name);

        if (!_.isEmpty(keepAliveNames) && index > -1 && _.isFunction(callback)) {
          callback();
          // 刷新数据后移除记录，不会再触发刷新
          keepAliveNames.splice(index, 1);
          this.$store.commit('setRefreshDataMap', { key, value: keepAliveNames });
        }
      });
    }
  },
  beforeDestroy() {
    const refreshDataCallbackMap = this[this.$Constants.REFRESH_DATA_CALLBACK_MAP];

    this.$store.commit('setAppPageToolsMap', {
      key: this.$options.name,
      value: null,
    });

    // keep-alive的页面销毁后移除记录
    if (!_.isEmpty(refreshDataCallbackMap)) {
      Object.keys(refreshDataCallbackMap).forEach((key) => {
        const refreshDataMap = _.cloneDeep(this.mx_refreshDataMap);
        const keepAliveNames = refreshDataMap[key] || [];
        const index = keepAliveNames.indexOf(this.$route.name);

        if (!_.isEmpty(keepAliveNames) && index > -1) {
          keepAliveNames.splice(index, 1);
          this.$store.commit('setRefreshDataMap', { key, value: keepAliveNames });
        }
      });
    }
  },
  watch: {
    mx_isRefreshPage(refresh) {
      // 重新刷新页面所有数据
      if (refresh && _.isFunction(this.refreshPage)) {
        this.refreshPage();
      }
    },
  },
  computed: {
    ...mapState({
      mx_refreshDataMap: 'refreshDataMap',
      mx_isRefreshPage(state) {
        const currentRouteName = this.$route.name;
        return currentRouteName === this.$options.name && state.refreshPageMap[currentRouteName];
      },
    }),
  },
  methods: {
    mx_setAppPageToolsMap() {
      this.$store.commit('setAppPageToolsMap', {
        key: this.$route.name,
        value: this[this.$Constants.APP_PAGE_TOOLS],
      });
    },
  },
};

// table
const PAGE = 1;
const PAGE_SIZE = 10;
const PAGE_SIZES = [10, 30, 50];
const PAGINATION = {
  count: 0,
  page: PAGE,
  pageSize: PAGE_SIZE,
  pageSizes: PAGE_SIZES,
};

export const tableMixin = {
  data() {
    return {
      mx_tableMap: {}, // 存放页面内不同表格的信息
      mx_customize_pagination: undefined, // 自定义分页，在组件内定义覆盖此字段
    };
  },
  created() {
  },
  computed: {
    // 默认表格不需要在每个页面单独处理
    mx_defaultTableData() {
      const table = this.mx_getTargetTable();
      return (table && table.rows) || [];
    },
    mx_defaultPagination() {
      const table = this.mx_getTargetTable();
      return (table && table.pagination) || {};
    },
  },
  methods: {
    // 设置ajax获取的表格数据
    mx_setTableData(data, target) {
      const targetTable = this.mx_getTargetTable(target);

      if (!_.isEmpty(data) && !_.isEmpty(targetTable)) {
        targetTable.pagination.count = data.count;
        targetTable.pagination.page = data.page;
        targetTable.rows = data.rows;
      }
    },
    // 获取表格查询条件
    mx_getTableParams(target) {
      const targetTable = this.mx_getTargetTable(target);

      this.$set(targetTable.params.pagination, 'page', targetTable.pagination.page);
      this.$set(targetTable.params.pagination, 'pageSize', targetTable.pagination.pageSize);

      return targetTable.params;
    },
    // 表格排序变化
    mx_handleTableSortChange(sort, target) {
      const sortOrder = sort.order;
      const targetTable = this.mx_getTargetTable(target);

      targetTable.params.sort = [];

      if (sortOrder) {
        targetTable.params.sort.splice(0, 1, [sort.prop, sortOrder.substring(0, sortOrder.indexOf('ending'))]);
      }
      return _.isFunction(this.query) && this.query();
    },
    mx_resetTable(formTarget = 'filterForm', tableTarget = 'defaultTable') {
      this.$refs[formTarget].resetFields();
      this.$refs[tableTarget].clearSort();
      this.mx_handleTableSortChange({});
    },
    // 内存分页
    mx_paging(data, target) {
      const targetTable = this.mx_getTargetTable(target);
      const { page, pageSize } = targetTable.pagination;

      if (!_.isEmpty(data) && !_.isEmpty(targetTable)) {
        targetTable.pagingData = data;
      } else {
        data = targetTable.pagingData;
      }

      if (data && _.isArray(data)) {
        const count = data.length;
        const start = page * pageSize;
        const end = start + pageSize;
        const rows = data.slice(start, end);
        const result = { count, page, rows };

        this.mx_setTableData(result, target);
      }
    },
    // 获取表格
    mx_getTargetTable(target) {
      const tableKey = target || `${this.$options.name}Table`;

      if (_.isEmpty(this.mx_tableMap[tableKey])) {
        const tableData = {
          params: {
            filter: {},
            pagination: {},
            sort: {},
          }, // 查询参数
          rows: [], // 列表
          pagingData: [], // 内存分页
          pagination: _.cloneDeep(this.mx_customize_pagination || PAGINATION),
        };

        this.$set(this.mx_tableMap, tableKey, _.cloneDeep(tableData));
      }

      return this.mx_tableMap[tableKey] || {};
    },
  },
};

// dropdown
export const dropdownMixin = {
  data() {
    return {
      dropdownPrevField: '',
      dropdownField: '',
      dropdownFlag: false, // el-select 下拉时才执行查询时如果弹出messagebox, 会出现无法关闭messagebox和收起el-select，故需要处理
    };
  },
  methods: {
    mx_focusDropdown(field) {
      this.dropdownPrevField = this.dropdownField;
      this.dropdownField = field;
    },
    mx_openDropdown(visible) {
      if (!visible && this.dropdownPrevField === this.dropdownField) return;

      if (this.dropdownFlag) {
        this.dropdownFlag = false;
      } else {
        this.dropdownFlag = true;
        if (_.isFunction(this.doAfterOpenDropdown)) {
          this.doAfterOpenDropdown(this.dropdownField);
        }
      }
    },
  },
};
