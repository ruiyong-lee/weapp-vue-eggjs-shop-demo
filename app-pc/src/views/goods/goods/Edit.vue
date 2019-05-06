<template>
  <div>
    <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="7em"
             size="small" @submit.native.prevent>
      <el-row>
        <h2 class="content-title"><i class="el-icon-tickets"></i> 基本信息</h2>
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
            <el-input-number class="wp-100" v-model="goodsForm.salePrice" placeholder="元"
                             controls-position="right" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <h2 class="content-title"><i class="el-icon-picture-outline"></i> 商品图册</h2>
        <el-upload
          class="mb-15"
          action="utils/upload"
          list-type="picture-card"
          :file-list="fileList"
          :on-remove="handleUploadRemove"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          multiple>
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-row>
      <el-row>
        <h2 class="content-title"><i class="el-icon-goods"></i> 商品介绍</h2>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入商品介绍"
          v-model="goodsForm.goodsInfo">
        </el-input>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import { pageMixin } from '../../../utils/mixins/common';

  export default {
    name: 'goodsEdit',
    mixins: [pageMixin],
    components: {},
    data() {
      const { REFRESH_DATA_CALLBACK_MAP, GOODS_CATEGORY, APP_PAGE_TOOLS } = this.$Constants;
      this[REFRESH_DATA_CALLBACK_MAP] = {
        [GOODS_CATEGORY]: this.getCategoryDropdownList,
      };
      this[APP_PAGE_TOOLS] = [
        {
          content: '保存',
          callback: this.submitForm,
          type: 'primary',
        },
      ];
      return {
        fileList: [],
        categoryList: [],
        goodsForm: {},
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
          salePrice: [
            { required: true, message: '请输入售价', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'change' },
          ],
        },
      };
    },
    methods: {
      refreshPage() {
        this.get();
        this.getCategoryDropdownList();
      },
      async get() {
        const params = {
          uuid: this.$route.params.goodsUuid,
        };

        const res = await this.$api.goods.get(params);
        this.goodsForm = res;
        const images = JSON.parse(res.imagesJsonStr) || [];
        this.fileList = images.map(item => ({ url: item }));
      },
      async getCategoryDropdownList() {
        this.categoryList = await this.$api.goodsCategory.getDropdownList();
      },
      handleUploadRemove(file, fileList) {
        this.fileList = fileList;
      },
      handleUploadSuccess(response, file, fileList) {
        this.fileList = fileList;
      },
      handleUploadError() {
        this.$message({ message: '上传失败', type: 'error' });
      },
      formatImagesJsonStr() {
        const images = this.fileList.map((item = {}) => {
          const { response = {}, url } = item;
          return response.data || url;
        });
        this.goodsForm.thumbnail = images[0] || '';
        this.goodsForm.imagesJsonStr = JSON.stringify(images);
      },
      submitForm() {
        this.formatImagesJsonStr();
        this.$refs.goodsForm.validate(async (valid) => {
          if (valid) {
            await this.$api.goods.saveModify({ goods: this.goodsForm });
            this.$message({ message: '修改商品成功', type: 'success' });
            this.$router.push({ name: 'goodsList' });
          }
        });
      },
    },
  };
</script>
