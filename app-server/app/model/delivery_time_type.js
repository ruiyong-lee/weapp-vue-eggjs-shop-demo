'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const deliveryTimeTypeSchema = require('../schema/deliverytimetype.js')(app);
  const DeliveryTimeType = db.defineModel(app, 'deliverytimetype', deliveryTimeTypeSchema);

  /**
   * 查找收货时间
   * @param {Object} { merchantUuid, attributes } 条件
   * @return {Array|Null} 查找结果
   */
  DeliveryTimeType.getList = async ({ merchantUuid, attributes }) => {
    return await DeliveryTimeType.findAll({
      attributes,
      where: { orgUuid: merchantUuid },
    });
  };

  return DeliveryTimeType;
};

