import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {}, // 用户信息
    keepAliveNames: '', // 所有缓存页面集合
    refreshPageMap: {}, // 控制所有tab页面刷新
    refreshDataMap: {}, // 控制所有tab页面局部数据刷新
    appPageToolsMap: {}, // 所有缓存页面工具按妞
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
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
    setAppPageToolsMap(state, obj) {
      Vue.set(state.appPageToolsMap, obj.key, obj.value);
    },
  },
  actions: {},
});
