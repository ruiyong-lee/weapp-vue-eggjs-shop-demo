<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form" @submit.native.prevent>
      <el-form-item prop="userName">
        <el-input v-model.trim="loginForm.userName" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model.trim="loginForm.password" type="password" placeholder="密码" @keyup.enter="submitForm('loginForm')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="loginForm.loginType">
          <el-radio label="merchant">商家</el-radio>
          <el-radio label="admin">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="mb-0">
        <el-button class="login-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          userName: '',
          password: '',
          loginType: 'merchant',
        },
        rules: {
          userName: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await this.$api.login(this.loginForm);
            window.location.hash = '';
            window.location.reload();
          }
          return valid;
        });
      },
    },
  };
</script>

<style lang="scss">
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .login-form {
      width: 360px;
      .el-form-item {
        margin-bottom: 15px;
        &:first-child {
          margin-bottom: 32px;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-form-item__label, .el-form-item__error {
        color: #fff;
      }
      .el-form-item.is-required .el-form-item__label:before {
        content: '';
        margin-left: 0;
      }
      .el-input__inner {
        border-color: #fff !important;
      }
      .el-radio {
        color: #bbb;
      }
      .el-radio__inner {
        background-color: #bbb;
        &:hover {
          border-color: #d8dce5;
        }
      }
      .el-radio__input.is-checked {
        .el-radio__inner {
          border: 2px solid #fff;
          background: #fff;
          &:after {
            background-color: #1cc09f;
          }
        }
        + .el-radio__label {
          color: #fff;
        }
      }
      .login-btn {
        width: 100%;
        border-color: #1cc09f;
        background-color: #1cc09f;
      }
    }
  }
</style>
