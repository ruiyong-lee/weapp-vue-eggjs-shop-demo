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
        this.fail(ctx.UNIQUE_CODE, `账号：${fields.userName} 的商家已存在`);
      } else {
        throw new Error(err);
      }
    }
  }

  /**
   * 修改商家
   */
  async saveModify() {
    const { ctx } = this;
    const rule = {
      merchant: 'object',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.user.merchant.saveModify(ctx.request.body);
    this.success(uuid);
  }

  /**
   * 获取商家分页列表
   */
  async query() {
    const { ctx } = this;
    const merchantData = await ctx.service.user.merchant.query(ctx.request.body);
    this.success(merchantData);
  }

  /**
   * 根据uuid获取商家
   */
  async get() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const merchant = await ctx.service.user.merchant.get(uuid);
    this.success(merchant);
  }
}

module.exports = UserMerchantController;
