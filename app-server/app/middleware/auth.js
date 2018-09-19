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
    if (ctx.path.indexOf('/weapp/') === 0) {
      // 微信小程序接口
      const sessionid = ctx.get('sessionid');
      const session = ctx.helper.JSONParse(await app.redis.get('default').get(sessionid)) || {};
      const { openId } = session;

      ctx.request.body.openId = openId;

      // 过滤登录接口
      if (ctx.path === '/weapp/login') {
        return;
      }

      // 判断是否有session
      if (!openId) {
        ctx.body = {
          errorCode: 100,
          message: '尚未登录',
        };
      }

      await next();
    } else {
      // 过滤登录接口
      if (ctx.path === '/user/login') {
        return;
      }

      await ctx.verifyToken();

      // 管理端接口
      await next();
    }
  };
};
