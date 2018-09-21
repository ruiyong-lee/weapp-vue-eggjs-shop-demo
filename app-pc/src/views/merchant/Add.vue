<template>
  <div>
    <el-form :model="merchantForm" :rules="rules" ref="merchantForm" label-width="7em" class="default-form"
             size="small">
      <el-row>
        <el-col :span="11">
          <h2 class="content-title">基础资料</h2>
          <el-form-item label="商家名称" prop="name">
            <el-input v-model.trim="merchantForm.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model.trim="merchantForm.linkMan"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model.trim="merchantForm.linkPhone"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model.trim="merchantForm.address"></el-input>
          </el-form-item>
          <el-form-item label="客服电话">
            <el-input v-model.trim="merchantForm.servicePhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <h2 class="content-title">关联小程序</h2>
          <el-form-item label="小程序APPID">
            <el-input v-model.trim="merchantForm.appId"></el-input>
          </el-form-item>
          <el-form-item label="小程序密匙">
            <el-input v-model.trim="merchantForm.appSecret"></el-input>
          </el-form-item>
          <el-form-item label="商户号">
            <el-input v-model.trim="merchantForm.mchId"></el-input>
          </el-form-item>
          <el-form-item label="商户密匙">
            <el-input v-model.trim="merchantForm.mchKey"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <h2 class="content-title">登录资料</h2>
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
        <el-button type="primary" @click="submitForm('merchantForm')">立即创建</el-button>
        <el-button @click="resetForm('merchantForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { pageMixin } from '../../utils/mixins';
  import { Pattern } from '../../utils/common';

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
          appId: '',
          appSecret: '',
          mchKey: '',
          mchId: '',
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
    mounted() {

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.createMechant({ merchant: this.merchantForm }).then((res) => {
              console.log(res);
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
