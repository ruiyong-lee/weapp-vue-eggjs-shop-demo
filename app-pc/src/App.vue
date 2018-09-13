<template>
  <div class="app">
    <el-container class="app-container">
      <el-header class="app-header">
        <div class="app-header__left">
          <icon name="menu" class="text-primary cursor-pointer" @click.native="isCollapse = !isCollapse"></icon>
        </div>
        <div class="app-header__center">
          <div class="app-tabs">
            <icon name="left-circle" class="tabs-icon text-primary"></icon>
            <ul class="tabs-ul">
              <li v-for="item in 5" class="tabs-li" :class="{active: item === 1}" :id="key" :key="item">
                <div class="tabs-li-content">
                  <icon name="sync" class="text-primary"></icon>
                  <span class="tab-title">{{item}}</span>
                  <icon name="close" class="text-primary"></icon>
                </div>
              </li>
            </ul>
            <icon name="right-circle" class="text-primary"></icon>
          </div>
        </div>
        <div class="app-header__right">
          <el-dropdown>
            <span>
              ruiyong.lee <icon name="user" class="text-primary"></icon>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>账号信息</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <easy-scrollbar>
          <el-aside class="app-aside" :width="isCollapse ? '64px' : '200px'" v-auto-windows-height="100">
            <el-menu
              class="app-menu"
              :default-active="routeName"
              :collapse="isCollapse"
              text-color="#485a6a"
              active-text-color="#5C9ACF"
              router
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="home" :route="{ name: 'home' }">
                <icon name="home" class="el-icon-v"></icon>
                <span slot="title">home</span>
              </el-menu-item>
              <el-menu-item index="about" :route="{ name: 'about' }">
                <i class="el-icon-menu"></i>
                <span slot="title">about</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
        </easy-scrollbar>
        <el-main>
          <el-collapse-transition>
            <keep-alive :include="keepAliveNamesStr">
              <router-view class="app-view"/>
            </keep-alive>
          </el-collapse-transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import { ScaleTransition } from 'vue2-transitions';

  export default {
    components: {
      ScaleTransition,
    },
    data() {
      return {
        isCollapse: false,
        keepAliveNamesStr: ['home', 'about'],
      };
    },
    computed: {
      routeName() {
        return this.$route.name;
      },
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }

  *:not(input,textarea) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
  }

  input {
    border: 0;
    outline: none;
    -webkit-appearance: none;
  }

  html, body {
    height: 100%;
    width: 100%;
    font-size: 26px;
    overflow-x: hidden;
    color: #333333;
    background-color: #e9ecf3;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .fa-icon {
    vertical-align: middle;
  }

  .app {
    height: 100%;

  }

  .app-container {
    height: 100%;
  }

  .app-aside {
    padding: 20px 0 20px 20px;
    overflow: initial !important;
    transition: all 0.3s ease-in-out;
    box-sizing: content-box !important;
  }

  .app-menu {
    min-height: 100%;
    border-radius: 6px;
    border-right: 0 !important;
    overflow: hidden;
    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }

  .app-header {
    display: flex;
    z-index: 9;
    align-items: center;
    font-size: 12px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .05);
    .app-header__left {
      width: 64px;
      text-align: center;
    }
    .app-header__center {
      padding: 0 15px;
      flex: 1;
    }
    .app-header__right {
      text-align: right;
    }
  }

  .app-view {
    padding: 15px;
    border-radius: 6px;
    background-color: #fff;
  }

  //tab
  .app-tabs {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 9;
    padding: 0 15px;
    width: 100%;
    height: 26px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    .tabs-icon {
    }
    .tabs-ul {
      flex: 1;
      padding: 0 15px;
      height: inherit;
      width: auto;
      white-space: nowrap;
      overflow: hidden;
      transition: all 0.3s ease-in-out;
      .tabs-li {
        position: relative;
        display: inline-block;
        margin-right: 5px;
        padding: 0 10px;
        height: inherit;
        line-height: 24px;
        color: #5C9ACF;
        border: 1px solid #5C9ACF;
        border-radius: 2px;
        background-color: #fff;
        .tabs-li-content {
          display: flex;
          align-items: center;
          > span {
            cursor: pointer;
          }
          &.active {
            color: #fff;
            border-color: #5C9ACF;
            background-color: #5C9ACF;
          }
        }
      }
    }
  }
</style>
