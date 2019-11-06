<template>
  <div class="app">
    <el-container class="app-container">
      <el-header class="app-header">
        <div class="app-header__left">
          <!--展开/收起侧边栏-->
          <el-tooltip :content="isCollapse ? '展开侧边栏' : '收起侧边栏'" placement="top">
            <i class="iconfont icon-menu text-primary cursor-pointer"
               @click="isCollapse = !isCollapse"></i>
          </el-tooltip>
        </div>
        <div class="app-header__center">
          <!--tab-->
          <div class="app-tab" v-tab="activeTabIndex">
            <i class="iconfont icon-left-circle switch-tab-prev mr-15" @click="switchPrevTab"></i>
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
                       @click="$router.push(item)">
                    <span class="tab-li-title">{{item.meta && item.meta.title}}</span>
                    <i class="iconfont icon-close tab-li-icon text-primary"
                       @click.stop="closeTab(index)"></i>
                  </div>
                </li>
              </ul>
            </div>
            <i class="iconfont icon-right-circle switch-tab-next ml-15" @click="switchNextTab"></i>
          </div>
        </div>
        <div class="app-header__right">
          <!--刷新按钮-->
          <el-tooltip content="刷新" placement="top">
            <i class="iconfont icon-sync app-feature-btn" @click="refreshCurrentPage"></i>
          </el-tooltip>

          <!--通知面板-->
          <el-popover
            placement="bottom"
            width="400"
            trigger="hover"
            popper-class="p-0"
            :disabled="noticeCount === 0">
            <el-badge class="app-feature-btn" :value="noticeCount" :max="99" :hidden="false"
                      slot="reference">
              <i class="el-icon-bell" @click="$router.push({ name: 'noticeList' })"></i>
            </el-badge>
            <div class="app-notice">
              <div class="app-notice-body" @click="$router.push({ name: 'noticeList' })">
                <div class="app-notice-item" v-for="item in noticeList" :key="item.uuid">
                  <div class="ellipsis">
                    <div class="app-notice-item__dot"></div>
                    <span>{{item.title}}：{{item.content}}</span>
                  </div>
                  <div class="app-notice-item__time">{{item.createdTime}}</div>
                </div>
              </div>
              <a class="app-notice-footer" @click="readAll">
                全部标记为已读
                <i class="el-icon-view text-middle"></i>
              </a>
            </div>
          </el-popover>

          <!--账号信息下拉-->
          <el-dropdown class="app-user-dropdown">
            <span>
              <span class="app-user-name">{{decodeURI(user.name || '')}}</span>
              <i class="iconfont icon-user text-primary text-middle"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="user.userType !== 'admin'"
                @click.native="$router.push({ name: 'merchantView', params: { merchantUuid: user.userUuid }})">
                账号信息
              </el-dropdown-item>
              <el-dropdown-item @click.native="$router.push({ name: 'passwordEdit'})">
                修改密码
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <!--侧边栏-->
        <el-aside class="app-aside" :width="isCollapse ? '64px' : '200px'"
                  v-auto-windows-height="101">
          <vue-scroll>
            <el-menu
              class="app-menu"
              :default-active="$route.name"
              :collapse="isCollapse"
              text-color="#485a6a"
              active-text-color="#5C9ACF"
              router
            >
              <template v-if="user.userType === 'admin'">
                <el-menu-item index="merchant" :route="{ name: 'merchantList' }">
                  <i class="iconfont icon-user"></i>
                  <span slot="title">商家管理</span>
                </el-menu-item>
              </template>

              <template v-else>
                <el-menu-item index="home" :route="{ name: 'home' }">
                  <i class="app-menu-icon iconfont icon-home"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="bill">
                  <template slot="title">
                    <i class="iconfont icon-file-text app-menu-icon"></i>
                    <span>订单</span>
                  </template>
                  <el-menu-item index="orderList" :route="{ name: 'orderList' }">订货单</el-menu-item>
                  <!--<el-menu-item index="orderList" :route="{ name: 'orderList' }">退货单</el-menu-item>-->
                </el-submenu>
                <el-submenu index="goods">
                  <template slot="title">
                    <i class="iconfont icon-shopping app-menu-icon"></i>
                    <span>商品</span>
                  </template>
                  <el-menu-item index="goodsList" :route="{ name: 'goodsList' }">商品管理</el-menu-item>
                  <el-menu-item index="goodsCategoryList" :route="{ name: 'goodsCategoryList' }">
                    类别管理
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="logistics">
                  <template slot="title">
                    <i class="iconfont icon-car app-menu-icon"></i>
                    <span>物流</span>
                  </template>
                  <el-menu-item index="freightPlan" :route="{ name: 'freightPlanList' }">运费方案
                  </el-menu-item>
                  <el-menu-item index="deliveryTimeType" :route="{ name: 'deliveryTimeTypeList' }">
                    送货时间
                  </el-menu-item>
                </el-submenu>
                <el-menu-item index="noticeList" :route="{ name: 'noticeList' }">
                  <i class="iconfont icon-bell app-menu-icon"></i>
                  <span slot="title">消息</span>
                </el-menu-item>
              </template>
            </el-menu>
          </vue-scroll>
        </el-aside>

        <el-main>
          <!--面包屑和工具栏-->
          <section v-if="$route.name !== 'login'" class="app-page">
            <div class="app-page-header">
              <el-row class="app-page-header__row">
                <el-col :span="12">
                  <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="item in $route.meta && $route.meta.breadcrumbs"
                                        :key="item.name">
                      <router-link :to="{name: item.name}">{{item.title}}</router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-if="$route.name !== 'home'">
                      {{$route.meta && ($route.meta.breadcrumbTitle || $route.meta.title)}}
                    </el-breadcrumb-item>
                  </el-breadcrumb>
                </el-col>
                <!--不同页面渲染不同的工具按钮，在页面内自定义，根据屏幕宽度判断是否收起-->
                <el-col class="app-page-tools" :span="12" v-tools="isCollapse">
                  <div class="app-page-tools__expand">
                    <template v-for="item in appPageTools">
                      <el-button
                        :type="item.type"
                        :icon="item.icon"
                        size="mini"
                        round
                        v-if="item.content"
                        :key="item.content"
                        @click="item.callback"
                      >
                        {{item.content}}
                      </el-button>
                    </template>
                  </div>
                  <div class="app-page-tools__collapse">
                    <el-dropdown>
                      <i class="iconfont icon-ellipsis app-menu-icon"></i>
                      <el-dropdown-menu slot="dropdown">
                        <template v-for="item in appPageTools">
                          <el-dropdown-item
                            v-if="item.content"
                            :key="item.content"
                            @click.native="item.callback"
                          >
                            {{item.content}}
                          </el-dropdown-item>
                        </template>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </el-col>
              </el-row>
            </div>

            <!--页面-->
            <vue-scroll>
              <keep-alive :include="keepAliveNames">
                <router-view class="app-view" v-auto-windows-height="175"/>
              </keep-alive>
            </vue-scroll>
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
      const appTabContent = el.querySelector('.app-tab-content');
      const tabUlElement = el.querySelector('.tab-ul');
      const switchTabPrevElement = el.querySelector('.switch-tab-prev');
      const switchTabNextElement = el.querySelector('.switch-tab-next');
      const tabLiElements = tabUlElement.querySelectorAll('.tab-li');
      const activeTabLiElement = tabLiElements[activeTabLiElementIndex];

      if (activeTabLiElement) {
        const appTabContentWidth = appTabContent.offsetWidth;
        const tabUlElementWidth = tabUlElement.offsetWidth;
        const activeTabLiElementWidth = activeTabLiElement.offsetWidth;
        const activeTabLiElementLeft = activeTabLiElement.offsetLeft;
        const distance = appTabContentWidth - activeTabLiElementWidth - activeTabLiElementLeft;
        const showSwitchTab = tabUlElementWidth < appTabContentWidth ? 'hidden' : 'visible';

        if (distance < 0) {
          tabUlElement.style.left = `${distance}px`;
        } else if (activeTabLiElementLeft <= 0) {
          tabUlElement.style.left = 0;
        }

        switchTabPrevElement.style.visibility = showSwitchTab;
        switchTabNextElement.style.visibility = showSwitchTab;
      }
    }
  };

  // 调整tools样式
  const adjustToolsLayout = (el, binding) => {
    const expandElement = el.querySelector('.app-page-tools__expand');
    const collapseElement = el.querySelector('.app-page-tools__collapse');

    if (expandElement) {
      const elWidth = el.offsetWidth;
      const expandElementWidth = expandElement.offsetWidth;
      let isCollapse;

      // 68是侧边栏展开与收起的高宽度差，binding.value代表侧边栏展开与收起情况
      if (!!binding.value === !!binding.oldValue) {
        isCollapse = expandElementWidth > elWidth;
      } else if (binding.value) {
        isCollapse = expandElementWidth > (elWidth + 68);
      } else {
        isCollapse = expandElementWidth > (elWidth - 68);
      }

      expandElement.style.visibility = isCollapse ? 'hidden' : 'visible';
      collapseElement.style.visibility = isCollapse ? 'visible' : 'hidden';
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
        noticeCount: 0,
        noticeList: [],
      };
    },
    created() {
      this.initUser();
      this.initNotice();
    },
    mounted() {
      window.addEventListener('resize', () => {
        adjustTabLayout(document.querySelector('.app-tab'), { value: this.activeTabIndex });
        adjustToolsLayout(document.querySelector('.app-page-tools'), { value: this.isCollapse });
      });
    },
    computed: {
      appPageTools() {
        return this.appPageToolsMap[this.$route.name] || {};
      },
      ...mapState({
        user: 'user',
        isReadAll: 'isReadAll',
        appPageToolsMap: 'appPageToolsMap',
      }),
    },
    watch: {
      $route: {
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
      keepAliveNames: {
        handler(list = []) {
          this.$store.commit('setKeepAliveNames', list);
        },
        immediate: true,
      },
      isCollapse: {
        handler(val) {
          this.$store.commit('setIsCollapse', val);
        },
        immediate: true,
      },
      isReadAll(val) {
        if (val) {
          this.initNotice();
        }
      },
    },
    sockets: {
      connect() {
        console.log('socket connected');
      },
      disconnect() {
        console.warn('socket disconnect');
      },
      notice(message = {}) {
        const { action, payload = {} } = message.data || {};
        const { title, content } = payload;

        this.$notify.info({
          title,
          message: content,
          offset: 30,
        });

        switch (action) {
          case 'new_order':
            this.initNotice();
            break;
          default:
            break;
        }
      },
    },
    methods: {
      // 初始化用户信息
      initUser() {
        const name = this.$cookie.get('name');
        const userUuid = this.$cookie.get('userUuid');
        const userName = this.$cookie.get('userName');
        const userType = this.$cookie.get('userType');

        this.$store.commit('setUser', {
          name, userUuid, userName, userType,
        });
      },
      // 初始化消息通知
      async initNotice() {
        const res = await this.$api.notice.overview();
        const { count = 0, rows = [] } = res || {};
        this.noticeCount = count;
        this.noticeList = rows;
      },
      // 消息全部标记为已读
      async readAll() {
        await this.$api.notice.readAll();
        this.$message({ message: '全部标记为已读', type: 'success' });
        this.$store.dispatch('readAll');
      },
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
          this.$router.push(tab);
        }
      },
      // 跳转到下一个tab
      switchNextTab() {
        const { activeTabIndex } = this;

        if (activeTabIndex < this.tabList.length - 1) {
          const tab = this.tabList[activeTabIndex + 1] || {};
          this.$router.push(tab);
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
            this.activeTabIndex -= 1;
          }
          this.tabList.splice(index, 1);
        }
      },
      // 刷新当前页面数据（重新请求数据）
      refreshCurrentPage() {
        const currentRouteName = this.$route.name;
        this.$store.dispatch('refreshPage', currentRouteName);
      },
      // 退出登录
      async logout() {
        await this.$api.logout();
        this.$router.push({ name: 'login' });
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
      tools: {
        inserted(el, binding) {
          adjustToolsLayout(el, binding);
        },
        componentUpdated(el, binding) {
          adjustToolsLayout(el, binding);
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

  a {
    color: $--color-primary;
  }

  input {
    border: 0;
    outline: none;
    -webkit-appearance: none;
  }

  html, body {
    height: 100%;
    width: 100%;
    min-width: 1200px;
    font-size: 26px;
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

  /*侧边栏*/
  .app-aside {
    margin: 20px 0 20px 20px;
    border-radius: 6px;
    background-color: $--color-white;
    overflow: hidden !important;
    transition: all 0.3s ease-in-out;

    .app-menu {
      min-height: 100%;
      border-right: 0 !important;

      &:not(.el-menu--collapse) {
        width: 200px;
      }

      .app-menu-icon {
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
        vertical-align: middle;
      }
    }
  }

  /*头部*/
  .app-header {
    display: flex;
    z-index: 9;
    align-items: center;
    font-size: 12px;
    background-color: $--color-white;
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

  /*通知下拉*/
  .app-notice {
    .app-notice-body {
      padding: 0 24px;

      .app-notice-item {
        padding: 12px 0;
        color: rgba(0, 0, 0, 0.65);
        cursor: pointer;

        &:not(:last-child) {
          border-bottom: 1px solid #E8E8E8;
        }

        .app-notice-item__dot {
          display: inline-block;
          margin-right: 10px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: $--color-red;
          vertical-align: middle;
        }

        .app-notice-item__title {
        }

        .app-notice-item__time {
          margin-top: 5px;
          padding-left: 20px;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }

    .app-notice-footer {
      display: block;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-top: 1px solid #E8E8E8;
      cursor: pointer;
    }
  }

  /*页面*/
  .app-page {
    position: relative;
    padding: 10px 5px 15px;
    border-radius: 6px;
    background-color: $--color-white;

    .app-page-header {
      padding: 0 15px;
      margin-bottom: 10px;

      .app-page-header__row {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid $--color-primary;
      }
    }

    .app-page-tools {
      position: relative;
      height: 28px;
      text-align: right;
      overflow: hidden;

      .app-page-tools__expand {
        position: absolute;
        right: 0;
        white-space: nowrap;
      }

      .app-page-tools__collapse {
        .app-menu-icon {
          font-size: 28px;
          color: $--color-primary;
          cursor: pointer;
        }
      }
    }

    .app-view {
      position: relative;
      padding: 5px 15px 0;
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
      background: linear-gradient(to bottom right, $--color-red, $--color-primary);
    }

    .el-breadcrumb__inner.is-link, .el-breadcrumb__inner a {
      color: $--color-primary !important;
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
      color: $--color-primary;
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
              font-size: 14px;
              line-height: 1;
              transition: inherit;
              overflow: hidden;
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
              color: $--color-white;
              border-color: $--color-primary;
              background-color: $--color-primary;

              .tab-li-icon {
                color: $--color-white !important;
              }
            }
          }
        }
      }
    }
  }

  /*功能按钮*/
  .app-feature-btn {
    margin-left: 25px;
    color: $--color-primary;
    font-size: 18px;
    cursor: pointer;
    vertical-align: middle !important;
  }

  .app-user-dropdown {
    margin-left: 25px;

    .app-user-name {
      margin-right: 5px;
      vertical-align: middle;
    }
  }

  .content-title {
    padding-bottom: 10px;
    margin-bottom: 15px;
    color: $--color-primary;
    font-weight: bold;
    border-bottom: 1px solid #e9ecf3;
  }

  .el-switch-text {
    margin-left: 10px;
    vertical-align: middle;
  }
</style>
