'use strict';
const defineAddressModel = require('../../../schema/address.js');

module.exports = app => {
  const Address = defineAddressModel(app);

  /**
   * 查询用户默认地址
   * @param {Object} params 条件
   * @return {Object|Null} 查找结果
   */
  Address.getDefault = async params => {
    const { openId, attributes } = params;

    return await Address.findOne({
      attributes,
      where: { openId, sysDefault: 1 },
    });
  };

  return Address;
};

