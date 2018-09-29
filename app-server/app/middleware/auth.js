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

      await next();

      // 过滤登录接口
      if (ctx.path === '/weapp/login') {
        return;
      }

      // 判断是否有session
      if (!openId) {
        ctx.body = {
          code: ctx.noLoginCode,
          message: '尚未登录',
        };
      }
    } else {
      // 管理端接口
      ctx.request.body.userUuid = ctx.request.body.userUuid || ctx.cookies.get('userUuid', { signed: false });
      ctx.request.body.userName = ctx.request.body.userName || ctx.cookies.get('userName', { signed: false });
      ctx.request.body.userType = ctx.request.body.userType || ctx.cookies.get('userType', { signed: false });

      await next();

      // 过滤登录接口
      const ignorePaths = ['/user/login', '/user/logout'];
      if (ignorePaths.includes(ctx.path)) {
        return;
      }
      await ctx.verifyToken();
    }
  };
};
