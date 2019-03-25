<template>
  <div>
    <el-table :data="mx_defaultTableData" size="mini">
      <el-table-column prop="name" label="名称">
        <template slot-scope="scope">
          <span class="text-bold">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180" align="center"></el-table-column>
      <el-table-column prop="surcharge" label="附加费用" width="180" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="showDialog('edit', scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text-btn" size="mini" @click="deleteDeliveryTimeType(scope.row.uuid)">
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
        <el-form-item label="名称" label-width="7em" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="7em" prop="remark">
          <el-input v-model="dialogForm.remark" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="附加费用" label-width="7em" prop="surcharge">
          <el-input-number class="wp-100" v-model="dialogForm.surcharge"
                           controls-position="right" :min="0"></el-input-number>
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
    name: 'deliveryTimeTypeList',
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
          remark: '',
          surcharge: 0,
        },
        dialogRules: {
          name: [
            { required: true, message: '请输入送货时间名称', trigger: 'blur' },
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
        const res = await this.$api.deliveryTimeType.query(params);
        this.mx_setTableData(res);
      },
      showDialog(type, deliveryTimeType) {
        const isEdit = type === 'edit';

        this.dialogType = type;
        this.dialogVisible = true;
        this.dialogTitle = isEdit ? '编辑' : '新增';

        if (!_.isEmpty(deliveryTimeType)) {
          this.dialogForm = _.cloneDeep(deliveryTimeType);
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
              await this.$api.deliveryTimeType.saveModify({ deliveryTimeType: this.dialogForm });
              this.$message({ message: '修改送货时间成功', type: 'success' });
              this.hideDialog();
              this.query();
            } else {
              await this.$api.deliveryTimeType.saveNew({ deliveryTimeType: this.dialogForm });
              this.$message({ message: '新增送货时间成功', type: 'success' });
              this.hideDialog();
              this.query();
            }
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      deleteDeliveryTimeType(categoryUuid) {
        this.$confirm('将永久删除该送货时间, 是否继续？', '提示', {
          type: 'warning',
        }).then(async () => {
          await this.$api.deliveryTimeType.remove({ categoryUuid });
          this.$message({ message: '删除送货时间成功', type: 'success' });
          this.query();
        }).catch(() => {
        });
      },
    },
  };
</script>
