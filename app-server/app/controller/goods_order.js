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
    const goodsOrderData = await ctx.service.goodsOrder.query({ ...ctx.request.body, ...ctx.query });

    this.success(goodsOrderData);
  }

  /**
   * 获取订单详情
   */
  async get() {
    const { ctx } = this;
    const { uuid } = ctx.request.body;
    const rule = {
      uuid: 'string',
    };
    ctx.validate(rule);
    const goodsOrder = await ctx.service.goodsOrder.get(uuid);

    this.success(goodsOrder);
  }
}

module.exports = GoodsOrderController;
