<template>
  <div>
    <el-table :data="mx_defaultTableData" size="mini">
      <el-table-column prop="name" label="名称">
        <template slot-scope="scope">
          <span class="text-bold">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="basicFreight" label="基础运费" width="180" align="center"></el-table-column>
      <el-table-column prop="freeFreightAmount" label="免运费金额" width="180" align="center"></el-table-column>
      <el-table-column prop="sysDefault" label="是否默认" width="80" align="center">
        <template slot-scope="scope">
          <i class="el-icon-check"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="showDialog('edit', scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text-btn" size="mini" @click="deleteFreightPlan(scope.row.uuid)">
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
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="基础运费" prop="basicFreight">
          <el-input-number class="wp-100" v-model="dialogForm.basicFreight"
                           controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="免运费金额" prop="freeFreightAmount">
          <el-input-number class="wp-100" v-model="dialogForm.freeFreightAmount"
                           controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="设为默认" prop="sysDefault">
          <el-switch v-model="dialogForm.sysDefault"></el-switch>
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
    name: 'freightPlanList',
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
          basicFreight: 0,
          freeFreightAmount: 0,
          sysDefault: false,
        },
        dialogRules: {
          name: [
            { required: true, message: '请输入运费方案名称', trigger: 'blur' },
          ],
          basicFreight: [
            { required: true, message: '请输入基础运费', trigger: 'blur' },
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
        const res = await this.$api.freightPlan.query(params);
        this.mx_setTableData(res);
      },
      showDialog(type, freightPlan) {
        const isEdit = type === 'edit';

        this.dialogType = type;
        this.dialogVisible = true;
        this.dialogTitle = isEdit ? '编辑' : '新增';

        if (!_.isEmpty(freightPlan)) {
          this.dialogForm = _.cloneDeep(freightPlan);
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
              await this.$api.freightPlan.saveModify({ freightPlan: this.dialogForm });
              this.$message({ message: '修改运费方案成功', type: 'success' });
              this.hideDialog();
              this.query();
            } else {
              await this.$api.freightPlan.saveNew({ freightPlan: this.dialogForm });
              this.$message({ message: '新增运费方案成功', type: 'success' });
              this.hideDialog();
              this.query();
            }
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      deleteFreightPlan(categoryUuid) {
        this.$confirm('将永久删除该运费方案, 是否继续？', '提示', {
          type: 'warning',
        }).then(async () => {
          await this.$api.freightPlan.remove({ categoryUuid });
          this.$message({ message: '删除运费方案成功', type: 'success' });
          this.query();
        }).catch(() => {
        });
      },
    },
  };
</script>
