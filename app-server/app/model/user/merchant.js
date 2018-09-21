'use strict';
const db = require('../../../database/db.js');

module.exports = app => {
  const merchantSchema = require('../../schema/merchant.js')(app);
  const Merchant = db.defineModel(app, 'merchant', merchantSchema);

  /**
   * 查找商家
   * @param {Object} { uuid, attributes } 条件
   * @return {Object|Null} 查找结果
   */
  Merchant.get = async ({ uuid, attributes }) => {
    return await Merchant.findOne({
      attributes,
      where: { uuid },
    });
  };

  /**
   * 新增商家
   * @param {Object} merchant 条件
   * @return {String} 商家uuid
   */
  Merchant.saveNew = async merchant => {
    await Merchant.create(merchant);
    return merchant.uuid;
  };

  return Merchant;
};

