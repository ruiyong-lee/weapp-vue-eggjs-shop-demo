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
   * @param {Object} params 条件
   * @return {Object|null} 查找结果
   */
  async query(params = {}) {
    const { app } = this;
    const { Sequelize } = app;
    return await app.model.GoodsOrder.query({
      ...params,
      attributes: [
        'uuid', 'status', 'billNumber', 'goodsTotalQty',
        [Sequelize.fn('0+CAST', Sequelize.literal('goodsTotalQty AS CHAR')), 'goodsTotalQty'],
        [Sequelize.fn('ROUND', Sequelize.col('paymentAmount'), 2), 'paymentAmount'],
      ],
    });
  }

  /**
   * 获取订单
   * @param {String} uuid 订单uuid
   * @return {Object|Null} 查找结果
   */
  async get(uuid) {
    const { app } = this;
    const { Sequelize } = app;
    return await app.model.GoodsOrder.get({
      uuid,
      orderAttributes: [
        'uuid', 'status', 'billNumber', 'addressUuid', 'linkMan', 'linkPhone', 'address',
        'deliveryTimeTypeUuid', 'deliveryTimeTypeName', 'deliveryTimeTypeRemark', 'remark', 'createdTime',
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
    });
  }

  /**
   * 创建订单
   * @param {Object} params 条件
   * @return {String} 订单uuid
   */
  async createBill({ merchantUuid, goodsOrder = {}, openId, nickName }) {
    const { app, ctx } = this;
    const uuid = ctx.helper.uuidv1();
    const billNumber = await app.getBillNumber('DG');
    const { lines = [] } = goodsOrder;
    const params = {
      goodsOrder: {
        ...goodsOrder,
        uuid,
        billNumber,
        version: 1,
        orgUuid: merchantUuid,
        creatorId: openId,
        creatorName: nickName,
        customerUuid: openId,
        customerName: nickName,
        lastModifierId: openId,
        lastModifierName: nickName,
      },
      goodsOrderLines: lines.map((line = {}) => {
        const { goods } = line;
        const lineUuid = ctx.helper.uuidv1();
        return {
          ...line,
          goodsUuid: goods.uuid,
          goodsCode: goods.code,
          goodsName: goods.name,
          uuid: lineUuid,
          billUuid: uuid,
        };
      }),
    };

    return await app.model.GoodsOrder.createBill(params);
  }
}

module.exports = GoodsOrderService;
