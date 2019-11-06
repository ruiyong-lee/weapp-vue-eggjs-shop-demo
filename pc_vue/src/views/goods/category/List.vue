<template>
  <div>
    <el-form class="filter-form" :inline="true" ref="filterForm" :model="filter" size="mini" @submit.native.prevent>
      <el-form-item label="名称" prop="keywordsLike">
        <el-input v-model.trim="filter.keywordsLike" placeholder="类别名称" clearable @keyup.enter.native="query"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button @click="mx_resetTable()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="defaultTable" :data="mx_defaultTableData" size="mini" @sort-change="mx_handleTableSortChange">
      <el-table-column prop="name" label="名称" sortable="custom">
        <template slot-scope="scope">
          <span class="text-bold">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" sortable="custom" width="180"></el-table-column>
      <el-table-column prop="lastModifiedTime" label="最后修改时间" sortable="custom" width="180"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="showDialog('edit', scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text-btn" size="mini" @click="deleteCategory(scope.row.uuid)">
            删除
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

    <!--新增、编辑弹窗-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" center @close="handleDialogClose">
      <el-form :model="dialogForm" :rules="dialogRules" ref="dialogForm" label-width="6em" @submit.native.prevent>
        <el-form-item label="类别名称" prop="name">
          <el-input v-model.trim="dialogForm.name" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { pageMixin, tableMixin } from '../../../utils/mixins/common';

  export default {
    name: 'goodsCategoryList',
    mixins: [pageMixin, tableMixin],
    components: {},
    data() {
      this[this.$Constants.APP_PAGE_TOOLS] = [
        {
          icon: 'el-icon-plus',
          content: '新增',
          callback: this.showDialog,
          type: 'primary',
        },
      ];
      this.selectedData = {};
      this.dialogType = '';
      return {
        filter: {
          keywordsLike: '',
        },
        dialogForm: {
          name: '',
        },
        dialogRules: {
          name: [
            { required: true, message: '请输入类别名称', trigger: 'blur' },
          ],
        },
        dialogTitle: '',
        dialogVisible: false,
      };
    },
    methods: {
      refreshPage() {
        this.query();
      },
      async query() {
        const params = this.mx_getTableParams();
        params.filter = this.filter;
        const res = await this.$api.goodsCategory.query(params);
        this.mx_setTableData(res);
      },
      showDialog(type, goodsCategory) {
        const isEdit = type === 'edit';

        this.dialogType = type;
        this.dialogVisible = true;
        this.dialogTitle = isEdit ? '编辑' : '新增';

        if (!_.isEmpty(goodsCategory)) {
          this.$nextTick(() => {
            const selectedData = _.cloneDeep(goodsCategory);
            this.selectedData = selectedData;
            this.dialogForm.name = selectedData.name;
          });
        }
      },
      hideDialog() {
        this.dialogType = '';
        this.dialogTitle = '';
        this.dialogVisible = false;
      },
      handleDialogClose() {
        this.$refs.dialogForm.resetFields();
      },
      submitForm(formName) {
        const { dialogType, dialogForm, selectedData } = this;
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (dialogType === 'edit') {
              await this.$api.goodsCategory.saveModify({ goodsCategory: { ...selectedData, ...dialogForm } });
              this.$message({ message: '修改类别成功', type: 'success' });
              this.hideDialog();
              this.query();
            } else {
              await this.$api.goodsCategory.saveNew({ goodsCategory: this.dialogForm });
              this.$message({ message: '新增类别成功', type: 'success' });
              this.hideDialog();
              this.query();
            }
          }
        });
      },
      deleteCategory(uuid) {
        this.$confirm('将永久删除该类别, 是否继续？', '提示', {
          type: 'warning',
        }).then(async () => {
          await this.$api.goodsCategory.remove({ uuid });
          this.$message({ message: '删除类别成功', type: 'success' });
          this.query();
        }).catch(() => {
        });
      },
    },
  };
</script>
