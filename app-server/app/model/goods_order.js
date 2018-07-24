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
   * @param {Object} params 条件
   * @return {Object|Null} 查找结果
   */
  GoodsOrder.query = async params => {
    const { status, attributes, page, pageSize: limit, merchantUuid } = params;
    let condition = {
      offset: (page - 1) * limit,
      limit,
      attributes,
      where: { orgUuid: merchantUuid },
    };

    if (status) {
      condition = Object.assign(condition.where, { status });
    }

    const { count, rows } = await GoodsOrder.findAndCountAll(condition);

    return { page, count, rows };
  };

  /**
   * 查询订单
   * @param {Object} params 条件
   * @return {Object|Null} 查找结果
   */
  GoodsOrder.get = async params => {
    const { orderAttributes, orderLineAttributes, uuid } = params;
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

  return GoodsOrder;
};

