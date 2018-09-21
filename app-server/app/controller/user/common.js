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
   * 登录
   * @return {Function|null} 登录结果
   */
  async login() {
    const { ctx, app } = this;
    const { userName, password } = ctx.request.body;
    let user;

    if (userName === 'admin') {
      // 根据userName获取管理员
      user = await ctx.service.user.admin.getAdminByLogin(userName, md5(password));
    } else {
      // 根据userName获取商家
      user = await ctx.service.user.merchant.getMerchantByLogin(userName, md5(password));
    }

    if (app._.isEmpty(user)) {
      return this.fail(999, '账号或密码错误');
    }

    const { uuid: userUuid, userType } = user;
    ctx.setToken({ userUuid, userName, userType });
    this.success({ userUuid, userName, userType });
  }
}

module.exports = UserCommonController;
