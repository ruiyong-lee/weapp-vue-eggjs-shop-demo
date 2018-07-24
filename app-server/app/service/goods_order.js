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
    const { Sequelize } = app;
    return await app.model.GoodsOrder.query(Object.assign(params, {
      attributes: ['uuid', 'status', 'billNumber', 'goodsTotalQty', [Sequelize.fn('ROUND', Sequelize.col('paymentAmount'), 2), 'paymentAmount']],
    }));
  }

  /**
   * 获取订单
   * @param {String} uuid 参数
   * @return {Object|Null} 查找结果
   */
  async get(uuid) {
    const { app } = this;
    const { Sequelize } = app;
    return await app.model.GoodsOrder.get(Object.assign({ uuid }, {
      orderAttributes: [
        'uuid', 'status', 'billNumber', 'addressUuid', 'linkMan', 'linkPhone', 'address',
        'deliveryTimeTypeUuid', 'deliveryTimeTypeName', 'deliveryTimeTypeRemark', 'remark',
        [Sequelize.fn('ROUND', Sequelize.col('totalAmount'), 2), 'totalAmount'],
        [Sequelize.fn('ROUND', Sequelize.col('freightAmount'), 2), 'freightAmount'],
        [Sequelize.fn('ROUND', Sequelize.col('paymentAmount'), 2), 'paymentAmount'],
        [Sequelize.fn('ROUND', Sequelize.col('deliveryTimeTypeSurcharge'), 2), 'deliveryTimeTypeSurcharge'],
      ],
      orderLineAttributes: [
        'uuid', 'goodsPic', 'unitName', 'goodsName', 'goodsCode', 'goodsUuid', 'remark',
        [Sequelize.fn('ROUND', Sequelize.col('salePrice'), 2), 'salePrice'],
        [Sequelize.fn('0+CAST', Sequelize.literal('goodsQty AS CHAR')), 'goodsQty'],
      ],
    }));
  }
}

module.exports = GoodsOrderService;
