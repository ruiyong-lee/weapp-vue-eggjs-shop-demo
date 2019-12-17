import Vue from 'vue';
import Element from 'element-ui';
import vuescroll from 'vuescroll/dist/vuescroll-native';
import VeLine from 'v-charts/lib/line.common';
import VueSocketIO from 'vue-socket.io';
import _ from 'lodash';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api/api';
import SafeImg from './components/SafeImg.vue';
import Pagination from './components/Pagination.vue';
import filters from './utils/filters';
import { Constants } from './utils/constants';
import './directive';
import './styles/reset.css';
import './styles/element-variables.scss';
import './styles/element-cover.scss';
import './styles/common.scss';

Vue.use(_);
Vue.use(Element);
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: '#5C9ACF',
      onlyShowBarOnScroll: false,
    },
  },
});
Vue.use(new VueSocketIO({
  debug: true,
  connection: '/',
}));
Vue.component(VeLine.name, VeLine);
Vue.component('safe-img', SafeImg);
Vue.component('pagination', Pagination);
Vue.prototype.$api = api;
Vue.prototype.$Constants = Constants;
Vue.config.productionTip = false;

// 全局过滤器
Object.entries(filters).forEach(([name, fn]) => {
  Vue.filter(name, fn);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
