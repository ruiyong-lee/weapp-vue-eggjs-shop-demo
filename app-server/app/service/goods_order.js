'use strict';

const Service = require('egg').Service;

/**
 * Service - 订单
 * @class
 * @author ruiyong-lee
 */
class GoodsOrderService extends Service {
  /**
   * 获取订单列表
   * @param {Object} params 参数
   * @return {Object|null} 查找结果
   */
  async query(params = {}) {
    const { app } = this;
    return await app.model.GoodsOrder.query(Object.assign(params, {
      attributes: [ 'uuid', 'status', 'billNumber', 'goodsTotalQty', [ app.Sequelize.fn('ROUND', app.Sequelize.col('paymentAmount'), 2), 'paymentAmount' ] ],
    }));
  }
}

module.exports = GoodsOrderService;
