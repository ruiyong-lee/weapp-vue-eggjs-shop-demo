<template>
  <div>
    <el-form :model="merchantForm" :rules="rules" ref="merchantForm" label-width="7em"
             size="small" @submit.native.prevent>
      <el-row>
        <el-col :span="11">
          <h2 class="content-title"><i class="el-icon-tickets"></i> 基础资料</h2>
          <el-form-item label="商家名称" prop="name">
            <el-input v-model.trim="merchantForm.name"></el-input>
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
          <el-form-item label="账号">
            {{merchantForm.userName}}
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-if="userType === 'admin'" v-model="merchantForm.enableStatus"
                       inactive-value="0" active-value="1"></el-switch>
            <span class="el-switch-text" :class="merchantForm.enableStatus | formatEnableStatusToClass">
              {{merchantForm.enableStatus | formatEnableStatusToCN}}
            </span>
          </el-form-item>
          <template v-if="userType === 'admin'">
            <el-form-item label="重置密码">
              <el-switch v-model="resetPassword"></el-switch>
            </el-form-item>
            <template v-if="resetPassword">
              <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model.trim="merchantForm.password" autocomplete="new-password"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="checkPassword">
                <el-input type="password" v-model.trim="merchantForm.checkPassword"
                          autocomplete="new-password"></el-input>
              </el-form-item>
            </template>
          </template>
        </el-col>
      </el-row>
      <el-row v-if="userType === 'merchant'">
        <el-col :span="11">
          <h2 class="content-title"><i class="el-icon-connection"></i> 关联小程序</h2>
          <el-form-item label="小程序ID：">
            <el-input v-model.trim="merchantForm.appId"></el-input>
          </el-form-item>
          <el-form-item label="小程序密匙：">
            <el-input v-model.trim="merchantForm.appSecret"></el-input>
          </el-form-item>
          <el-form-item label="商户号：">
            <el-input v-model.trim="merchantForm.mchId"></el-input>
          </el-form-item>
          <el-form-item label="商户密匙：">
            <el-input v-model.trim="merchantForm.mchKey"></el-input>
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
  import { mapState } from 'vuex';
  import { pageMixin } from '../../../utils/mixins/common';

  export default {
    name: 'merchantEdit',
    mixins: [pageMixin],
    components: {},
    data() {
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
          mchId: '',
          mchKey: '',
        },
        resetPassword: false,
        rules: {
          name: [
            { required: true, message: '请输入商家名称', trigger: 'blur' },
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
    computed: {
      ...mapState({
        userType: (state) => state.user.userType,
      }),
    },
    methods: {
      refreshPage() {
        this.get();
      },
      async get() {
        const { merchantUuid: uuid } = this.$route.params;

        const res = await this.$api.merchant.get({ uuid });
        this.merchantForm = { ...this.merchantForm, ...res };
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await this.$api.merchant.saveModify({ merchant: this.merchantForm });
            this.$message({ message: '修改商家成功', type: 'success' });
            switch (this.userType) {
              case 'admin':
                this.$router.push({ name: 'merchantList' });
                break;
              case 'merchant':
                this.$router.push({ name: 'merchantView' });
                break;
              default:
                this.$router.push({ name: '' });
            }
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
</script>
