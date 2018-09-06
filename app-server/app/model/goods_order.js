'use strict';
const defineGoodsOrderModel = require('../schema/goodsorder.js');
const defineGoodsOrderLineModel = require('../schema/goodsorderline');

module.exports = app => {
  const GoodsOrder = defineGoodsOrderModel(app);
  const GoodsOrderLine = defineGoodsOrderLineModel(app);

  // 关系
  GoodsOrder.hasMany(GoodsOrderLine, { foreignKey: 'billUuid', as: 'lines' });

  /**
   * 分页查询订单列表
   * @param {Object} { status, attributes, page, pageSize: limit, merchantUuid, openId } 条件
   * @return {Object|Null} 查找结果
   */
  GoodsOrder.query = async ({ status, attributes, page, pageSize: limit, merchantUuid, openId }) => {
    const condition = {
      offset: (page - 1) * limit,
      limit,
      attributes,
      where: { orgUuid: merchantUuid, customerUuid: openId },
      order: [['createdTime', 'DESC']],
    };

    if (status) {
      condition.where = { ...condition.where, status };
    }

    const { count, rows } = await GoodsOrder.findAndCountAll(condition);

    return { page, count, rows };
  };

  /**
   * 查询订单
   * @param {Object} { orderAttributes, orderLineAttributes, uuid } 条件
   * @return {Object|Null} 查找结果
   */
  GoodsOrder.get = async ({ orderAttributes, orderLineAttributes, uuid }) => {
    const ressult = await GoodsOrder.findById(uuid, {
      attributes: orderAttributes,
      include: [
        {
          model: GoodsOrderLine,
          as: 'lines',
          attributes: orderLineAttributes,
        },
      ],
    });

    return ressult;
  };

  /**
   * 创建订单
   * @param {Object} { goodsOrder, goodsOrderLines } 条件
   * @return {String} 返回订单uuid
   */
  GoodsOrder.createBill = async ({ goodsOrder, goodsOrderLines }) => {
    const transaction = await app.transition();

    goodsOrder = await GoodsOrder.create(goodsOrder, { transaction });
    goodsOrderLines = goodsOrderLines.map(item => {
      item.billUuid = goodsOrder.uuid;
      return item;
    });

    await GoodsOrderLine.bulkCreate(goodsOrderLines, { transaction });

    return goodsOrder.uuid;
  };

  /**
   * 取消订单
   * @param {Object} params 条件
   * @return {String} 返回订单uuid
   */
  GoodsOrder.cancelBill = async params => {
    const { uuid, version, lastModifierId, lastModifierName } = params;
    const result = await GoodsOrder.update({ status: 'audited', lastModifierId, lastModifierName }, {
      where: { uuid, version: version - 1 },
      fields: ['status', 'lastModifierId', 'lastModifierName'],
    });
    app.checkUpdate(result);

    return uuid;
  };

  return GoodsOrder;
};

