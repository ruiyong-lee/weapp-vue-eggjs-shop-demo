'use strict';

/**
 * 判断是否登录
 * @param {object} options - 中间件的配置项
 * @param {Egg.Application} app - 当前应用的实例
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
      ctx.request.body = { ...ctx.request.body, ...ctx.query };

      // 过滤登录接口
      if (ctx.path === '/weapp/login') {
        await next();
        return;
      }

      // 判断是否有session
      if (!openId) {
        ctx.body = {
          code: ctx.NO_LOGIN_CODE,
          message: '尚未登录',
        };
        return;
      }

      await next();
    } else {
      // 管理端接口
      // 过滤登录接口
      const ignorePaths = ['/user/login', '/user/logout'];
      if (ignorePaths.includes(ctx.path)) {
        await next();
        return;
      }
      await ctx.verifyToken();
      await next();
    }
  };
};
