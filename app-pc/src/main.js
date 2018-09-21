import Element from 'element-ui';
import VueCookie from 'vue-cookie';
import EasyScroll from 'easyscrolldt';
import Icon from 'vue-svg-icon/Icon.vue';
import _ from 'lodash';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api/api';
import './directive/';
import './styles/reset.css';
import './styles/element-variables.scss';
import './styles/common.scss';

Vue.use(Element);
Vue.use(VueCookie);
Vue.use(EasyScroll);
Vue.use(_);
Vue.component('icon', Icon);
Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
