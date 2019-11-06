import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {}, // 用户信息
    isCollapse: {}, // 侧边栏展开or关闭
    keepAliveNames: '', // 所有缓存页面集合
    refreshPageMap: {}, // 控制所有tab页面刷新
    refreshDataMap: {}, // 控制所有tab页面局部数据刷新
    appPageToolsMap: {}, // 所有缓存页面工具按妞
    isReadAll: false, // 全部消息是否标记已读
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
    },
    setIsCollapse(state, val) {
      state.isCollapse = val;
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
    setIsReadAll(state, val) {
      state.isReadAll = val;
    },
  },
  actions: {
    // 全部消息标记为已读
    readAll({ commit }) {
      commit('setIsReadAll', true);
      Vue.nextTick(() => {
        commit('setIsReadAll', false);
      });
    },
    // 刷新页面数据
    refreshPage({ commit }, routeName) {
      commit('setRefreshPageMap', { key: routeName, value: true });
      Vue.nextTick(() => {
        commit('setRefreshPageMap', { key: routeName, value: false });
      });
    },
  },
});
