'use strict';

const Controller = require('../core/base_controller');

/**
 * Controller - 订货单
 * @class
 * @author ruiyong-lee
 */
class GoodsOrderController extends Controller {
  /**
   * 获取订单分页列表
   */
  async query() {
    const { ctx } = this;
    const goodsOrderData = await ctx.service.goodsOrder.query(ctx.request.body);

    this.success(goodsOrderData);
  }

  /**
   * 获取订单详情
   */
  async get() {
    const { ctx } = this;
    const goodsOrder = await ctx.service.goodsOrder.get(ctx.request.body);

    this.success(goodsOrder);
  }

  /**
   * 配送订单
   */
  async dispatch() {
    const { ctx } = this;
    const rule = {
      uuid: 'string',
      version: 'number',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.goodsOrder.dispatch(ctx.request.body);

    this.success(uuid);
  }

  /**
   * 完成订单
   */
  async complete() {
    const { ctx } = this;
    const rule = {
      uuid: 'string',
      version: 'number',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.goodsOrder.complete(ctx.request.body);

    this.success(uuid);
  }
}

module.exports = GoodsOrderController;
