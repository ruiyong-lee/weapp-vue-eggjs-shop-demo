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

// meta.title：tab上显示的标题
// meta.tabKey：tabKey一样的路由会被显示在同一个tab页面下
// meta.isMainPage：相同tabKey的主页面，这个页面跳转到其他与此页面相同tabKey的页面会被缓存，比如：主页面是订单列表页，其他页面是订单详情页
// isMainPage = false的页面跳转到不是相同tabKey的页面，也会被缓存（切换tab），但是跳转到相同tabKey的页面不会被缓存
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: customImport('Home'),
      meta: { title: '首页', tabKey: 'home', isMainPage: true },
    },
    {
      path: '/about',
      name: 'about',
      component: customImport('About'),
      meta: { title: '订单', tabKey: 'about', isMainPage: true },
    },
    {
      path: '/order',
      name: 'order',
      component: customImport('Order'),
      meta: { title: '订单 • 详情', tabKey: 'about' },
    },
    {
      path: '/login',
      name: 'login',
      component: customImport('Login'),
      meta: { title: '登录', tabKey: 'login' },
    },
  ],
});
