<template>
  <div>
    <el-form :model="merchantForm" :rules="rules" ref="merchantForm" label-width="7em"
             size="small" @submit.native.prevent>
      <el-row>
        <el-col :span="11">
          <h2 class="content-title"><i class="el-icon-tickets"></i> 基础资料</h2>
          <el-form-item label="商家名称" prop="name">
            <el-input v-model.trim="merchantForm.name" placehodler="请输入1到16位账号（字母，数字，下划线，减号）"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="linkMan">
            <el-input v-model.trim="merchantForm.linkMan"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="linkPhone">
            <el-input v-model.trim="merchantForm.linkPhone"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model.trim="merchantForm.address"></el-input>
          </el-form-item>
          <el-form-item label="客服电话" prop="servicePhone">
            <el-input v-model.trim="merchantForm.servicePhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <h2 class="content-title"><i class="el-icon-tickets"></i> 登录资料</h2>
          <el-form-item label="账号" prop="userName">
            <el-input v-model.trim="merchantForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model.trim="merchantForm.password" autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model.trim="merchantForm.checkPassword" autocomplete="new-password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm('merchantForm')">保存</el-button>
        <el-button @click="resetForm('merchantForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { pageMixin } from '../../../utils/mixins/common';
  import { Pattern } from '../../../utils/constants';

  export default {
    name: 'merchantAdd',
    mixins: [pageMixin],
    components: {},
    data() {
      const validateUserName = (rule, value, callback) => {
        if (Pattern.userName.test(value)) {
          callback();
        } else {
          callback(new Error('请输入1到16位账号（字母，数字，下划线，减号）'));
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.merchantForm.checkPassword !== '') {
            this.$refs.merchantForm.validateField('checkPassword');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.merchantForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        merchantForm: {
          name: '',
          linkMan: '',
          linkPhone: '',
          address: '',
          servicePhone: '',
          userName: '',
          password: '',
          checkPassword: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入商家名称', trigger: 'blur' },
          ],
          userName: [
            { required: true, validator: validateUserName, trigger: 'blur' },
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' },
          ],
          checkPassword: [
            { required: true, validator: validatePass2, trigger: 'blur' },
          ],
        },
      };
    },
    created() {

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await this.$api.merchant.saveNew({ merchant: this.merchantForm });
            this.$message({ message: '新增商家成功', type: 'success' });
            this.$router.push({ name: 'merchantList' });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
</script>
