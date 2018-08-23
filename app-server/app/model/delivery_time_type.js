'use strict';
const defineDeliveryTimeTypeModel = require('../schema/deliverytimetype.js');

module.exports = app => {
  const DeliveryTimeType = defineDeliveryTimeTypeModel(app);

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

