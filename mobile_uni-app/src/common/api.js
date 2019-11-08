import http from './http';

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */

export default {
  goods: {
    getGoodsWithCategory: (data, options) => http.get('weapp/getGoodsWithCategory', data, options), // 查询符合条件的商家
  },
  user: {
    login: (data, options) => http.post('weapp/login', data, options), // 用户登录
  },
};
