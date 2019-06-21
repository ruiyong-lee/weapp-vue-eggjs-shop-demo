import Vue from 'vue';
import Element from 'element-ui';
import vuescroll from 'vuescroll/dist/vuescroll-native';
import Icon from 'vue-svg-icon/Icon.vue';
import VeLine from 'v-charts/lib/line.common';
import _ from 'lodash';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api/api';
import SafeImg from './components/SafeImg.vue';
import Pagination from './components/Pagination.vue';
import { Constants } from './utils/constants';
import './directive';
import './styles/reset.css';
import './styles/element-variables.scss';
import './styles/element-cover.scss';
import './styles/common.scss';

Vue.use(Element);
Vue.use(vuescroll);
Vue.use(_);
Vue.component('icon', Icon);
Vue.component(VeLine.name, VeLine);
Vue.component('safe-img', SafeImg);
Vue.component('pagination', Pagination);
Vue.prototype.$api = api;
Vue.prototype.$Constants = Constants;
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#5C9ACF',
  },
};

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
