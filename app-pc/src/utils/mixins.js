// 混合
const Pagination = () => import('../components/Pagination.vue');

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
};

export const tableMixin = {
  components: { Pagination },
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
    // 默认表格不需要在每个页面单独处理
    mx_defaultTableData() {
      const table = this.mx_tables[this.$options.name];
      return (table && table.rows) || [];
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
    // 初始化表格
    mx_initTablePage() {
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

        // 在组件内请求表格数据一定要放在这个方法里执行
        return _.isFunction(this.initTable) && this.initTable();
      });
    },
    // 初始化表格数据
    mx_initTableData(data, target) {
      const targetTable = this.mx_getTargetTable(target);

      if (!_.isEmpty(data) && !_.isEmpty(targetTable)) {
        targetTable.pagination.count = data.count;
        targetTable.pagination.page = data.page;
        targetTable.rows = data.rows;
      }
    },
    // 获取表格
    mx_getTargetTable(target) {
      return this.mx_tables[target || this.$options.name] || {};
    },
    // 获取表格查询条件
    mx_getTargetTableParams(target) {
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
        targetTable.params.sort.splice(0, 1, {
          fieldName: sort.prop,
          dir: sortOrder.substring(0, sortOrder.indexOf('ending')),
        });
      }
      return _.isFunction(this.query) && this.query();
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
        const result = {
          count,
          page,
          rows,
        };

        this.mx_initTableData(result, target);
      }
    },
  },
};

