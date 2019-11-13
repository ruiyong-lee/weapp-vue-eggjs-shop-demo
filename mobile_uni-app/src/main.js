import Vue from 'vue';
import App from './App.vue';
import api from './common/api';
import util from './common/util';
import filters from './common/filters';
import constants from './common/constants';

Vue.prototype.$api = api; // 接口
Vue.prototype.$util = util; // 工具函数
Vue.prototype.$constants = constants; // 常量
Vue.config.productionTip = false;

// 全局过滤器
Object.entries(filters).forEach(([name, fn]) => {
  Vue.filter(name, fn);
});

App.mpType = 'app';

const app = new Vue({
  ...App,
});
app.$mount();
