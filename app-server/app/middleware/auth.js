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

      await next();

      // 过滤登录接口
      if (ctx.path === '/weapp/login') {
        return;
      }

      // 判断是否有session
      if (!openId) {
        ctx.body = {
          code: ctx.NO_LOGIN_CODE,
          message: '尚未登录',
        };
      }
    } else {
      // 管理端接口
      const { userUuid, userName, userType, orgUuid } = ctx.request.body;
      ctx.request.body.userUuid = userUuid || ctx.cookies.get('userUuid', { signed: false });
      ctx.request.body.userName = userName || ctx.cookies.get('userName', { signed: false });
      ctx.request.body.userType = userType || ctx.cookies.get('userType', { signed: false });
      ctx.request.body.orgUuid = orgUuid || ctx.cookies.get('orgUuid', { signed: false });
      // 将get请求的ctx.query合并到ctx.request.body
      ctx.request.body = { ...ctx.request.body, ...ctx.query };

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
