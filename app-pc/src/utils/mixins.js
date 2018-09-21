// 混合

// page
export const pageMixin = {
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

// 搜索表格页面，每个组件如果有多个表格，除默认表格之外的表格必须有全局唯一的ref属性且以 'Table' 结尾，例如：ref="transportTable"
// 单独一个表格可以不设置, 但组件必须有全局唯一的name且默认表格如果需要设置ref必须以 'default' 开头，例如：ref="defaultTable"
const PAGE = 1;
const PAGESIZE = 10;
const PAGESIZES = [10, 30, 50];
const PAGINATION = {
  count: 0,
  page: PAGE,
  pageSize: PAGESIZE,
  pageSizes: PAGESIZES,
  layout: 'total, sizes, prev, pager, next, jumper',
};

export const tableMixin = {
  data() {
    return {
      mx_tables: {},
      mx_customize_pagination: undefined, // 自定义分页，在组件内定义覆盖此字段
    };
  },
  mounted() {
    this.mx_initTablePage();
  },
  computed: {
    mx_isPagination() {
      return !_.isEmpty(this.params) && !_.isEmpty(this.params.pagination);
    },
    mx_isSort() {
      return !_.isEmpty(this.params) && !_.isEmpty(this.params.sort);
    },
    // 默认表格不需要在每个页面单独处理
    mx_defaultTableData() {
      const table = this.mx_tables[this.$options.name];
      return (table && table.tableData) || [];
    },
    mx_defaultPagination() {
      const table = this.mx_tables[this.$options.name];

      if (!_.isEmpty(table)) {
        return (table && table.pagination) || {};
      }

      return _.cloneDeep(PAGINATION);
    },
  },
  methods: {
    mx_initTablePage() {
      const tableData = {
        pagingData: [], // 内存分页
        tableData: [],
        pagination: _.cloneDeep(this.mx_customize_pagination || PAGINATION),
      };

      this.$nextTick(() => {
        const componentId = this.$options.name;

        Object.keys(this.$refs).forEach((key) => {
          if (key.match(/^(?!default).*?Table/g)) {
            this.$set(this.mx_tables, key, _.cloneDeep(tableData));
          }
        });

        if (Object.keys(this.mx_tables).length === 0) {
          if (_.isUndefined(componentId)) {
            throw new Error("组件内有表格分页需要设置组件的全局唯一的name属性，多个表格除默认表格之外的表格必须有全局唯一的ref属性且以 'Table' 结尾, 例如：ref=\"transportTable\"");
          } else {
            this.$set(this.mx_tables, componentId, _.cloneDeep(tableData));
          }
        }

        return _.isFunction(this.initTable) && this.initTable();
      });
    },
    mx_setPageAndSizeToFilter(params, target) {
      params = params || this.params;
      const targetTable = this.mx_tables[target || this.$options.name];

      if (this.mx_isPagination && !_.isEmpty(targetTable)) {
        params.pagination.page = targetTable.pagination.page;
        params.pagination.pageSize = targetTable.pagination.pageSize;
      }
    },
    mx_initTableData(data, target) {
      const targetTable = this.mx_tables[target || this.$options.name];

      if (!_.isEmpty(data) && !_.isEmpty(targetTable)) {
        targetTable.pagination.count = data.count;
        targetTable.pagination.page = data.page;
        targetTable.tableData = data.rows;
      }
    },
    // 内存分页
    mx_paging(data, target) {
      const targetTable = this.mx_tables[target || this.$options.name];
      const targetTablePage = targetTable.pagination.page;
      const targetTablePageSize = targetTable.pagination.pageSize;

      if (!_.isEmpty(data) && !_.isEmpty(targetTable)) {
        targetTable.pagingData = data;
      } else {
        data = targetTable.pagingData;
      }

      if (data && _.isArray(data)) {
        const result = {};
        const len = data.length;
        const start = targetTablePage * targetTablePageSize;
        const end = start + targetTablePageSize;
        const values = data.slice(start, end);

        result.count = len;
        result.page = targetTablePage;
        result.values = values;

        this.mx_initTableData(result, target);
      }
    },
    mx_handlePageChange(page, target) {
      this.mx_tables[target || this.$options.name].pagination.page = page;
    },
    mx_handlePageSizeChange(pageSize, target) {
      this.mx_tables[target || this.$options.name].pagination.pageSize = pageSize;
    },
    mx_handleTableSortChange(sort) {
      const sortOrder = sort.order;

      if (this.mx_isSort) {
        this.params.sort = [];

        if (sortOrder) {
          this.params.sort.splice(0, 1, {
            fieldName: sort.prop,
            dir: sortOrder.substring(0, sortOrder.indexOf('ending')),
          });
        }
        return _.isFunction(this.query) && this.query();
      }
    },
  },
};

