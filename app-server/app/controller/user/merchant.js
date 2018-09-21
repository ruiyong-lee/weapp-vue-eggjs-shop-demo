'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - user merchant
 * @class
 * @author ruiyong-lee
 */
class UserMerchantController extends Controller {
  /**
   * 新增商家
   */
  async saveNew() {
    const { ctx } = this;

    try {
      const rule = {
        merchant: 'object',
      };
      ctx.validate(rule);
      const uuid = await ctx.service.user.merchant.saveNew(ctx.request.body);
      this.success(uuid);
    } catch (err) {
      const { fields = {}, name } = err;

      if (name === 'SequelizeUniqueConstraintError') {
        this.fail(ctx.uniqueCode, `账号：${fields.userName} 的商家已存在`);
      } else {
        throw new Error(err);
      }
    }
  }
}

module.exports = UserMerchantController;
