import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let customImport;

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
if (process.env.NODE_ENV === 'production') {
  customImport = file => import(`@/views/${file}.vue`);
} else {
  customImport = file => require(`@/views/${file}.vue`).default;
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: customImport('Home'),
    },
    {
      path: '/about',
      name: 'about',
      component: customImport('About'),
    },
  ],
});
