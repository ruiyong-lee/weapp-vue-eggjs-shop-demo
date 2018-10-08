<template>
  <div class="app">
    <el-container class="app-container">
      <el-header class="app-header">
        <div class="app-header__left">
          <el-tooltip :content="isCollapse ? '展开侧边栏' : '收起侧边栏'" placement="top">
            <icon name="menu" class="text-primary cursor-pointer" @click.native="isCollapse = !isCollapse"></icon>
          </el-tooltip>
        </div>
        <div class="app-header__center">
          <div class="app-tab" v-tab="activeTabIndex">
            <icon name="left-circle" class="switch-tab-prev mr-15" @click.native="switchPrevTab"></icon>
            <div class="app-tab-content">
              <ul class="tab-ul">
                <li v-for="(item, index) in tabList"
                    class="tab-li"
                    :class="{active: index === activeTabIndex}"
                    :id="item.name"
                    :key="item.name">
                  <div class="tab-li-content"
                       :class="{'tab-li-icon__show': isTabLiIconShow && hoverTabIndex === index}"
                       @mouseover="showTabLiIcon(index)"
                       @mouseout="hideTabLiIcon"
                       @click="$router.push({ name: item.name })">
                    <span class="tab-li-title">{{item.meta && item.meta.title}}</span>
                    <icon name="close" class="tab-li-icon text-primary" @click.native.stop="closeTab(index)"></icon>
                  </div>
                </li>
              </ul>
            </div>
            <icon name="right-circle" class="switch-tab-next ml-15" @click.native="switchNextTab"></icon>
          </div>
        </div>
        <div class="app-header__right">
          <el-tooltip content="刷新" placement="top">
            <icon name="sync" class="app-refresh-btn"
                  @click.native="refreshCurrentPage"></icon>
          </el-tooltip>
          <el-dropdown>
            <span>
              <span class="app-user-name">{{decodeURI(user.name || '')}}</span>
              <icon name="user" class="text-primary"></icon>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="user.userType !== 'admin'">账号信息</el-dropdown-item>
              <el-dropdown-item @click.native="$router.push({ name: 'passwordEdit'})">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <easy-scrollbar>
          <el-aside class="app-aside" :width="isCollapse ? '64px' : '200px'" v-auto-windows-height="100">
            <el-menu
              class="app-menu"
              :default-active="route.name"
              :collapse="isCollapse"
              text-color="#485a6a"
              active-text-color="#5C9ACF"
              router
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="home" :route="{ name: 'home' }">
                <icon name="home" class="el-icon-v"></icon>
                <span slot="title">首页</span>
              </el-menu-item>

              <template v-if="user.userType === 'admin'">
                <el-menu-item index="merchant" :route="{ name: 'merchantList' }">
                  <icon name="user" class="el-icon-v"></icon>
                  <span slot="title">商家管理</span>
                </el-menu-item>
              </template>

              <template v-else>
                <el-submenu index="bill">
                  <template slot="title">
                    <icon name="file-text" class="el-icon-v"></icon>
                    <span>订单</span>
                  </template>
                  <el-menu-item index="orderList" :route="{ name: 'orderList' }">订货单</el-menu-item>
                  <!--<el-menu-item index="orderList" :route="{ name: 'orderList' }">退货单</el-menu-item>-->
                </el-submenu>
                <el-submenu index="goods">
                  <template slot="title">
                    <icon name="shopping" class="el-icon-v"></icon>
                    <span>商品</span>
                  </template>
                  <el-menu-item index="goodsCategoryList" :route="{ name: 'goodsCategoryList' }">类别管理</el-menu-item>
                  <!--<el-menu-item index="orderList" :route="{ name: 'orderList' }">商品管理</el-menu-item>-->
                </el-submenu>
              </template>
            </el-menu>
          </el-aside>
        </easy-scrollbar>
        <el-main>
          <section v-if="route.name !== 'login'" class="app-page">
            <el-collapse-transition>
              <el-row class="app-page-header">
                <el-col :span="12">
                  <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="item in route.meta && route.meta.breadcrumbs" :key="item.name">
                      <router-link :to="{name: item.name}">{{item.title}}</router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-if="route.name !== 'home'">{{route.meta && (route.meta.breadcrumbTitle ||
                      route.meta.title)}}
                    </el-breadcrumb-item>
                  </el-breadcrumb>
                </el-col>
              </el-row>
            </el-collapse-transition>

            <el-collapse-transition>
              <keep-alive :include="keepAliveNames">
                <router-view class="app-view"/>
              </keep-alive>
            </el-collapse-transition>
          </section>
          <section v-else class="app-page app-login">
            <router-view class="app-view"/>
          </section>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  // 调整tab样式
  const adjustTabLayout = (el, binding) => {
    if (binding.value !== binding.oldValue) {
      const activeTabLiElementIndex = binding.value;
      const tabUlElement = el.querySelector('.tab-ul');
      const switchTabPrevElement = el.querySelector('.switch-tab-prev');
      const switchTabNextElement = el.querySelector('.switch-tab-next');
      const tabLiElements = tabUlElement.querySelectorAll('.tab-li');
      const activeTabLiElement = tabLiElements[activeTabLiElementIndex];
      const elWidth = el.offsetWidth;

      if (activeTabLiElement) {
        const activeTabLiElementWidth = activeTabLiElement.offsetWidth;
        const activeTabLiElementLeft = activeTabLiElement.offsetLeft;
        const distance = elWidth - activeTabLiElementWidth - activeTabLiElementLeft;

        if (distance < 0) {
          tabUlElement.style.left = `${distance}px`;
          switchTabPrevElement.style.visibility = 'visible';
          switchTabNextElement.style.visibility = 'visible';
        } else if (activeTabLiElementLeft <= 0) {
          tabUlElement.style.left = 0;
          switchTabPrevElement.style.visibility = 'hidden';
          switchTabNextElement.style.visibility = 'hidden';
        }
      }
    }
  };

  export default {
    data() {
      return {
        isTabLiIconShow: false,
        isCollapse: false,
        hoverTabIndex: 0,
        activeTabIndex: 0,
        tabList: [],
        keepAliveNames: [],
        keepAliveNamesMap: {},
      };
    },
    mounted() {
      const name = this.$cookie.get('name');
      const userUuid = this.$cookie.get('userUuid');
      const userName = this.$cookie.get('userName');
      const userType = this.$cookie.get('userType');

      this.$store.commit('setUser', {
        name, userUuid, userName, userType,
      });
    },
    computed: {
      route() {
        return this.$route || {};
      },
      ...mapState({
        user: 'user',
        activeTabKey: 'activeTabKey',
      }),
    },
    watch: {
      route: {
        handler(currentRoute = {}, prevRoute = {}) {
          const { name: prevRouteName, meta: prevRouteMeta = {} } = prevRoute;
          const { name: currentRouteName, meta: currentRouteMeta = {} } = currentRoute;

          if (currentRouteName === 'login') {
            this.keepAliveNames = [];
            this.keepAliveNamesMap = {};
          } else {
            const prevRouteNameIndex = this.keepAliveNames.indexOf(prevRouteName);
            const prevTabKey = prevRouteMeta.tabKey;
            const currentTabKey = currentRouteMeta.tabKey;
            const exist = this.tabList.some((tab = {}, index) => {
              const { meta } = tab;
              const validTabKey = meta.tabKey === currentTabKey;

              // 存在tab列表里面，则替换
              if (validTabKey) {
                this.activeTabIndex = index;
                this.tabList.splice(index, 1, currentRoute);
              }
              return validTabKey;
            });

            // 不存在缓存列表里面，则插入
            if (!this.keepAliveNames.includes(currentRouteName)) {
              this.keepAliveNames.push(currentRouteName);
              if (!this.keepAliveNamesMap[currentTabKey]) {
                this.keepAliveNamesMap[currentTabKey] = [];
              }
              if (!this.keepAliveNamesMap[currentTabKey].includes(currentRouteName)) {
                this.keepAliveNamesMap[currentTabKey].push(currentRouteName);
              }
            }

            // 处理前一个路由
            if (prevRouteMeta && !prevRouteMeta.isMainPage && prevTabKey === currentTabKey && prevRouteNameIndex >= 0) {
              const index = this.keepAliveNamesMap[prevTabKey].indexOf(prevRouteName);
              this.keepAliveNames.splice(prevRouteNameIndex, 1);
              this.keepAliveNamesMap[prevTabKey].splice(index, 1);
            }

            // 处理当前路由，如果跳转到主页面，则清理其他相同tabKey的页面缓存
            if (currentRouteMeta.isMainPage) {
              this.keepAliveNamesMap[currentTabKey].forEach((name) => {
                if (name !== currentRouteName) {
                  const index = this.keepAliveNames.indexOf(name);
                  this.keepAliveNames.splice(index, 1);
                }
              });
              this.keepAliveNamesMap[currentTabKey] = [currentRouteName];
            }

            // 不存在tab列表里面，则插入
            if (!exist) {
              this.tabList.push(currentRoute);
              this.$nextTick(() => {
                this.activeTabIndex = this.tabList.length - 1;
              });
            }
          }
        },
        immediate: true,
      },
      activeTabIndex: {
        handler(index) {
          const currentRoute = this.tabList[index] || {};
          const { meta = {} } = currentRoute;
          const { tabKey } = meta;

          this.$store.commit('setActiveTabKey', tabKey);
        },
        immediate: true,
      },
      keepAliveNames: {
        handler(list = []) {
          this.$store.commit('setKeepAliveNames', list);
        },
        immediate: true,
      },
    },
    methods: {
      // 显示tab上面的图标
      showTabLiIcon(index) {
        this.hoverTabIndex = index;
        this.isTabLiIconShow = true;
      },
      // 隐藏tab上面的图标
      hideTabLiIcon() {
        this.isTabLiIconShow = false;
      },
      // 跳转到上一个tab
      switchPrevTab() {
        const { activeTabIndex } = this;

        if (activeTabIndex > 0) {
          const tab = this.tabList[activeTabIndex - 1] || {};
          this.$router.push({ name: tab.name });
        }
      },
      // 跳转到下一个tab
      switchNextTab() {
        const { activeTabIndex } = this;

        if (activeTabIndex < this.tabList.length - 1) {
          const tab = this.tabList[activeTabIndex + 1] || {};
          this.$router.push({ name: tab.name });
        }
      },
      // 关闭tab
      closeTab(index) {
        // 如果关闭当前激活的tab则自动跳转到上一个或下一个tab， 并且清除相同tabKey的所有页面缓存
        if (this.tabList.length !== 1) {
          const currentRoute = this.tabList[index] || {};
          const { meta = {} } = currentRoute;
          const { tabKey } = meta;


          this.keepAliveNamesMap[tabKey].forEach((name) => {
            const keepAliveNameIndex = this.keepAliveNames.indexOf(name);
            this.keepAliveNames.splice(keepAliveNameIndex);
          });
          this.keepAliveNamesMap[tabKey] = null;

          if (this.activeTabIndex === index) {
            if (index > 0) {
              this.switchPrevTab();
            } else {
              this.switchNextTab();
            }
          } else if (index < this.activeTabIndex) {
            this.activeTabIndex -= this.activeTabIndex;
          }
          this.tabList.splice(index, 1);
        }
      },
      // 刷新当前页面数据（重新请求数据）
      refreshCurrentPage() {
        this.$store.commit('setRefreshPageMap', { key: this.activeTabKey, value: true });
        this.$nextTick(() => {
          this.$store.commit('setRefreshPageMap', { key: this.activeTabKey, value: false });
        });
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      logout() {
        this.$api.logout().then(() => {
          this.$router.push({ name: 'login' });
        }).catch(() => {
        });
      },
    },
    directives: {
      tab: {
        inserted(el, binding) {
          adjustTabLayout(el, binding);
        },
        update(el, binding) {
          adjustTabLayout(el, binding);
        },
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
      flex: 0 0 64px;
      text-align: center;
    }
    .app-header__center {
      padding: 0 15px;
      flex: 1;
      overflow-x: auto;
    }
    .app-header__right {
      text-align: right;
    }
  }

  .app-page {
    position: relative;
    padding: 15px;
    border-radius: 6px;
    background-color: #fff;
    .app-page-header {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #5C9ACF;
    }
    .app-view {
      position: relative;
      padding-top: 15px;
      .app-view-tools {
        position: absolute;
        width: 100%;
        top: -9px;
        height: 28px;
        overflow: hidden;
        transform: translateY(-100%);
        .svg-icon {
          width: 24px;
          height: 24px;
          color: #5C9ACF;
          cursor: pointer;
        }
      }
    }
    &.app-login {
      position: fixed;
      z-index: 2000;
      top: 0;
      left: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      border-radius: 0;
      overflow: hidden;
      background: linear-gradient(to bottom right, #FF5B5B, #5C9ACF);
    }
    .el-breadcrumb__inner.is-link, .el-breadcrumb__inner a {
      color: #5C9ACF !important;
    }
  }

  //tab
  .app-tab {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 9;
    padding: 0 15px;
    width: 100%;
    height: 26px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    .switch-tab-prev, .switch-tab-next {
      color: #5C9ACF;
      cursor: pointer;
    }
    .app-tab-content {
      position: relative;
      flex: 1;
      height: inherit;
      width: auto;
      white-space: nowrap;
      overflow: hidden;
      transition: inherit;
      .tab-ul {
        position: absolute;
        left: 0;
        transition: inherit;
        .tab-li {
          position: relative;
          display: inline-block;
          margin-right: 5px;
          height: inherit;
          line-height: 26px;
          border-radius: 2px;
          background-color: rgba(148, 148, 148, 0.1);
          vertical-align: middle;
          transition: inherit;
          overflow: hidden;
          .tab-li-content {
            display: flex;
            align-items: center;
            padding: 0 14px;
            color: #999;
            cursor: pointer;
            transition: inherit;
            .tab-li-icon {
              width: 0;
              height: 14px;
              transition: inherit;
            }
            &.tab-li-icon__show {
              padding: 0 7px;
              .tab-li-icon {
                width: 14px;
                color: #999;
              }
            }
            .tab-li-title {
              padding: 0 7px;
            }
          }
          &.active {
            .tab-li-content {
              color: #fff;
              border-color: #5C9ACF;
              background-color: #5C9ACF;
              .tab-li-icon {
                color: #fff !important;
              }
            }
          }
        }
      }
    }
  }

  .app-refresh-btn {
    margin-right: 25px;
    color: #5C9ACF;
    cursor: pointer;
  }

  .app-user-name {
    margin-right: 5px;
    vertical-align: middle;
  }

  .content-title {
    padding-bottom: 10px;
    margin-bottom: 15px;
    color: #5c9acf;
    font-weight: bold;
    border-bottom: 1px solid #e9ecf3;
  }

  .el-switch-text {
    margin-left: 10px;
    vertical-align: middle;
  }
</style>
