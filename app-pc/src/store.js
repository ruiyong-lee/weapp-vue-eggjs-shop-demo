import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {}, // 用户信息
    activeTabKey: '', // 当前页面tabKey
    keepAliveNames: '', // 所有缓存页面集合
    refreshPageMap: {}, // 控制所有tab页面刷新
    refreshDataMap: {}, // 控制所有tab页面局部数据刷新
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
    },
    setActiveTabKey(state, val) {
      state.activeTabKey = val;
    },
    setKeepAliveNames(state, val) {
      state.keepAliveNames = val;
    },
    setRefreshPageMap(state, obj) {
      Vue.set(state.refreshPageMap, obj.key, obj.value);
    },
    setRefreshDataMap(state, obj) {
      Vue.set(state.refreshDataMap, obj.key, obj.value || state.keepAliveNames);
    },
  },
  actions: {},
});
