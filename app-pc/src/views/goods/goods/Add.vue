<template>
  <div>
    <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="7em" class="default-form"
             size="small" @submit.native.prevent>
      <el-row>
        <h2 class="content-title">基本信息</h2>
        <el-col :span="12">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model.trim="goodsForm.name"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="categoryUuid">
            <el-select v-model="goodsForm.categoryUuid" class="wp-100" placeholder="请选择">
              <el-option
                v-for="item in categoryList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格" prop="spec">
            <el-input v-model.trim="goodsForm.spec"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位" prop="unitName">
            <el-input v-model.trim="goodsForm.unitName"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="goodsForm.status" class="wp-100" placeholder="请选择">
              <el-option
                v-for="(item, key) in $Constants.GOODS_STATUS"
                :key="key"
                :label="item"
                :value="key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="售价" prop="salePrice">
            <el-input v-model.number="goodsForm.salePrice"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <h2 class="content-title">商品图册</h2>
        <el-upload
          class="mb-15"
          action="goods/upload"
          list-type="picture-card"
          :on-remove="handleUploadRemove"
          multiple>
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-row>
      <div class="text-center">
        <el-form-item label-width="0">
          <el-button type="primary" @click="submitForm('goodsForm')">保存</el-button>
          <el-button @click="resetForm('goodsForm')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { pageMixin } from '../../../utils/mixins';

  export default {
    name: 'goodsAdd',
    mixins: [pageMixin],
    components: {},
    data() {
      return {
        categoryList: [],
        goodsForm: {
          name: '',
          spec: '',
          unitName: '',
          categoryUuid: '',
          salePrice: undefined,
          status: 'up',
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          unitName: [
            { required: true, message: '请输入单位', trigger: 'blur' },
          ],
          categoryUuid: [
            { required: true, message: '请选择类别', trigger: 'change' },
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'change' },
          ],
        },
      };
    },
    methods: {
      refreshPage() {
        this.getCategoryDropdownList();
      },
      getCategoryDropdownList() {
        this.$api.goodsCategory.getDropdownList().then((res) => {
          this.categoryList = res;
        }).catch(() => {
        });
      },
      handleUploadRemove(file, fileList) {
        console.log(file, fileList);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.goods.saveNew({ goods: this.goodsForm }).then(() => {
              this.$message({ message: '新增商品成功', type: 'success' });
              this.$router.push({ name: 'goodsList' });
            }).catch(() => {
            });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
</script>
