'use strict';
const defineGoodsOrderModel = require('../schema/goodsorder.js');

module.exports = app => {
  const GoodsOrder = defineGoodsOrderModel(app);

  /**
   * 分页查询订单列表
   * @param {object} params 条件
   * @return {object|null} 查找结果
   */
  GoodsOrder.query = async params => {
    const { status, attributes, page, pageSize: limit } = params;
    let condition = {
      offset: (page - 1) * limit,
      limit,
      attributes,
    };

    if (status) {
      condition = Object.assign(condition, { where: { status } });
    }

    const { count, rows } = await GoodsOrder.findAndCountAll(condition);

    return { page, count, rows };
  };

  return GoodsOrder;
};

