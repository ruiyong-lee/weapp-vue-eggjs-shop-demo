<template>
  <div>
    <el-form :model="passwordForm" :rules="rules" ref="passwordForm" label-width="7em"
             size="small" @submit.native.prevent>
      <el-row>
        <el-col :span="11">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model.trim="passwordForm.oldPassword" autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model.trim="passwordForm.newPassword" autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPassword">
            <el-input type="password" v-model.trim="passwordForm.checkPassword"
                      autocomplete="new-password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm('passwordForm')">保存</el-button>
        <el-button @click="resetForm('passwordForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { pageMixin } from '../../utils/mixins/common';

  export default {
    name: 'passwordEdit',
    mixins: [pageMixin],
    components: {},
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.passwordForm.checkPassword !== '') {
            this.$refs.passwordForm.validateField('checkPassword');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        passwordForm: {
          oldPassword: '',
          newPassword: '',
          checkPassword: '',
        },
        resetPassword: false,
        rules: {
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
          ],
          newPassword: [
            { required: true, validator: validatePass, trigger: 'blur' },
          ],
          checkPassword: [
            { required: true, validator: validatePass2, trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await this.$api.savePasswordModify(this.passwordForm);
            this.$message({ message: '修改密码成功', type: 'success' });
            this.$router.push({ name: 'login' });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
</script>
