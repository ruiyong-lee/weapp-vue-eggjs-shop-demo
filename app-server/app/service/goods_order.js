'use strict';

const Service = require('egg').Service;

/**
 * Service - 订单
 * @class
 * @author ruiyong-lee
 */
class GoodsOrderService extends Service {
  constructors() {
    this.goodsOrderStatus = {
      initial: '待处理',
      audited: '已接单',
      dispatching: '配送中',
      completed: '已完成',
      canceled: '已取消',
    };
  }

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
        'uuid', 'version', 'status', 'billNumber', 'goodsTotalQty',
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
    const { app, ctx } = this;
    const { Sequelize } = app;
    const { helper } = ctx;
    return await app.model.GoodsOrder.get({
      uuid,
      orderAttributes: [
        'uuid', 'status', 'billNumber', 'addressUuid', 'linkMan', 'linkPhone', 'address',
        'deliveryTimeTypeUuid', 'deliveryTimeTypeName', 'deliveryTimeTypeRemark', 'remark',
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdTime'), helper.dayTimeFormat), 'createdTime'],
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
    const crateInfo = ctx.helper.getCrateInfo({ openId, nickName });
    const billNumber = await app.getBillNumber('DG');
    const { lines = [] } = goodsOrder;
    const params = {
      goodsOrder: {
        ...goodsOrder,
        ...crateInfo,
        billNumber,
        orgUuid: merchantUuid,
        customerUuid: openId,
        customerName: nickName,
      },
      goodsOrderLines: lines.map((line = {}) => {
        const { goods } = line;
        return {
          ...line,
          goodsUuid: goods.uuid,
          goodsCode: goods.code,
          goodsName: goods.name,
        };
      }),
    };

    return await app.model.GoodsOrder.createBill(params);
  }

  /**
   * 取消订单
   * @param {Object} params 条件
   * @return {String} 订单uuid
   */
  async cancelBill(params = {}) {
    const { app, ctx } = this;
    const modifyInfo = ctx.helper.getModifyInfo(params);
    return await app.model.GoodsOrder.cancelBill({ ...params, ...modifyInfo });
  }
}

module.exports = GoodsOrderService;
