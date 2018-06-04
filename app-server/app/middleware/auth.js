'use strict';

/**
 * 判断是否登录
 * @param {Object} options 中间件的配置项
 * @param {Egg.Application} app 当前应用的实例
 * @author ruiyong-lee
 * @return {null} null
 */
module.exports = (options, app) => {
  return async function auth(ctx, next) {
    await next();

    const sessionid = ctx.get('sessionid');
    const session = await app.redis.get(sessionid);

    // 过滤登录接口
    if (ctx.path === '/weapp/login') {
      return;
    }

    // 判断是否有session
    if (!session) {
      ctx.body = {
        errorCode: 100,
        message: '尚未登录',
      };
    }
  };
};
