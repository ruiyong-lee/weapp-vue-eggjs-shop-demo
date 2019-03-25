<template>
  <div>
    <el-table :data="mx_defaultTableData" size="mini">
      <el-table-column prop="name" label="名称">
        <template slot-scope="scope">
          <span class="text-bold">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="lastModifiedTime" label="最后修改时间" width="180"></el-table-column>
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
      <el-form :model="dialogForm" :rules="dialogRules" ref="dialogForm" @submit.native.prevent>
        <el-form-item label="类别名称" label-width="6em" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off" clearable></el-input>
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
  import { pageMixin, tableMixin } from '../../../utils/mixins';

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
      return {
        dialogForm: {
          name: '',
        },
        dialogRules: {
          name: [
            { required: true, message: '请输入类别名称', trigger: 'blur' },
          ],
        },
        dialogType: '',
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
        const res = await this.$api.goodsCategory.query(params);
        this.mx_setTableData(res);
      },
      showDialog(type, goodsCategory) {
        const isEdit = type === 'edit';

        this.dialogType = type;
        this.dialogVisible = true;
        this.dialogTitle = isEdit ? '编辑' : '新增';

        if (!_.isEmpty(goodsCategory)) {
          this.dialogForm = _.cloneDeep(goodsCategory);
        }
      },
      hideDialog() {
        this.dialogType = '';
        this.dialogTitle = '';
        this.dialogVisible = false;
      },
      handleDialogClose() {
        this.resetForm('dialogForm');
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (this.dialogType === 'edit') {
              await this.$api.goodsCategory.saveModify({ goodsCategory: this.dialogForm });
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      deleteCategory(categoryUuid) {
        this.$confirm('将永久删除该类别, 是否继续？', '提示', {
          type: 'warning',
        }).then(async () => {
          await this.$api.goodsCategory.remove({ categoryUuid });
          this.$message({ message: '删除类别成功', type: 'success' });
          this.query();
        }).catch(() => {
        });
      },
    },
  };
</script>
