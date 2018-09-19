<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form">
      <el-form-item prop="userName">
        <el-input v-model.trim="loginForm.userName" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model.trim="loginForm.password" placeholder="密码"></el-input>
        <!--<el-input type="password" v-model="loginForm.password"></el-input>-->
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.login(this.loginForm).then(() => {
              this.$router.replace({ name: 'home' });
            }).catch(() => {
            });
          } else {
            console.log('error submit!!');
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
    .login-form {
      width: 360px;
      .el-form-item {
        margin-bottom: 32px;
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
      .login-btn {
        width: 100%;
        border-color: #1cc09f;
        background-color: #1cc09f;
      }
    }
  }
</style>
