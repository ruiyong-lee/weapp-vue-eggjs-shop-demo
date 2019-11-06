'use strict';

const Controller = require('../core/base_controller');

/**
 * Controller - 送货时间
 * @class
 * @author ruiyong-lee
 */
class DeliveryTimeTypeController extends Controller {
  /**
   * 新增送货时间
   */
  async saveNew() {
    const { ctx } = this;
    const rule = {
      deliveryTimeType: 'object',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.deliveryTimeType.saveNew(ctx.request.body);
    this.success(uuid);
  }

  /**
   * 修改送货时间
   */
  async saveModify() {
    const { ctx } = this;
    const rule = {
      deliveryTimeType: 'object',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.deliveryTimeType.saveModify(ctx.request.body);
    this.success(uuid);
  }

  /**
   * 删除送货时间
   */
  async remove() {
    const { ctx } = this;
    const uuid = await ctx.service.deliveryTimeType.remove(ctx.request.body);
    this.success(uuid);
  }

  /**
   * 获取送货时间分页列表
   */
  async query() {
    const { ctx } = this;
    const deliveryTimeTypeData = await ctx.service.deliveryTimeType.query(ctx.request.body);
    this.success(deliveryTimeTypeData);
  }

  /**
   * 根据uuid获取送货时间
   */
  async get() {
    const { ctx } = this;
    const deliveryTimeType = await ctx.service.deliveryTimeType.get(ctx.request.body);
    this.success(deliveryTimeType);
  }
}

module.exports = DeliveryTimeTypeController;
