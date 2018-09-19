'use strict';

const md5 = require('md5');
const Controller = require('../../core/base_controller');

/**
 * Controller - user common
 * @class
 * @author ruiyong-lee
 */
class UserCommonController extends Controller {
  /**
   * 获取用户信息
   */
  async getUserInfo() {
    const { ctx } = this;
    const { userUuid } = ctx.request.body;
    const rule = {
      userUuid: 'string',
    };
    ctx.validate(rule);
    const user = await ctx.service.user.common.getAdmin(userUuid);

    this.success(user);
  }

  /**
   * 登录
   * @return {Function|null} 登录结果
   */
  async login() {
    const { ctx, app } = this;
    const { userName, password } = ctx.request.body;
    let user;

    if (userName === 'admin') {
      // 根据userName获取管理员
      user = await ctx.service.user.common.getAdminByLogin(userName, md5(password));
    } else {
      // 根据userName获取商家
      user = await ctx.service.user.common.getMerchantByLogin(userName, md5(password));
    }

    if (app._.isEmpty(user)) {
      return this.fail(999, '账号或密码错误');
    }

    const { uuid: userUuid } = user;
    ctx.setToken({ userUuid, userName });
    this.success({ userUuid, userName });
  }
}

module.exports = UserCommonController;
