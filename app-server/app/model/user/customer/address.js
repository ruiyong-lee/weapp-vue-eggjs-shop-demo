'use strict';
const db = require('../../../../database/db.js');

module.exports = app => {
  const addressSchema = require('../../../schema/address.js')(app);
  const Address = db.defineModel(app, 'address', addressSchema);

  /**
   * 根据uuid获取用户地址
   * @param {object} { uuid, attributes } - 条件
   * @return {object|null} - 查找结果
   */
  Address.get = async ({ uuid, attributes }) => {
    return await Address.findById(uuid, {
      attributes,
    });
  };

  /**
   * 查询用户默认地址
   * @param {object} { openId, attributes } - 条件
   * @return {object|null} - 查找结果
   */
  Address.getDefault = async ({ openId, attributes }) => {
    return await Address.findOne({
      attributes,
      where: { openId, sysDefault: 1 },
    });
  };

  /**
   * 设置用户默认地址
   * @param {object} { uuid } - 条件
   * @return {string|null} - 用户地址uuid
   */
  Address.setDefault = async ({ uuid }) => {
    const transaction = await app.transition();
    await Address.update({ sysDefault: 0 }, { where: { sysDefault: 1 }, transaction });
    await Address.update({ uuid, sysDefault: 1 }, { where: { uuid }, transaction });

    return uuid;
  };

  /**
   * 删除用户地址
   * @param {object} { uuid } - 条件
   * @return {string|null} - 删除用户地址uuid
   */
  Address.delete = async ({ uuid }) => {
    const result = await Address.destroy({ where: { uuid } });

    app.checkDelete(result);

    return uuid;
  };

  /**
   * 查询用户地址列表
   * @param {object} { openId, attributes } - 条件
   * @return {Array|null} - 查找结果
   */
  Address.getList = async ({ openId, attributes }) => {
    return await Address.findAll({
      attributes,
      where: { openId },
    });
  };

  /**
   * 新增用户地址
   * @param {object} address - 条件
   * @return {string} - 地址uuid
   */
  Address.saveNew = async address => {
    if (address.sysDefault) {
      const transaction = await app.transition();
      await Address.update({ sysDefault: 0 }, { where: { sysDefault: 1 }, transaction });
      await Address.create(address, { transaction });
    } else {
      await Address.create(address);
    }

    return address.uuid;
  };

  /**
   * 修改用户地址
   * @param {object} address - 条件
   * @return {string} - 返回地址uuid
   */
  Address.saveModify = async address => {
    let result;
    const { uuid, version } = address;

    if (address.sysDefault) {
      const transaction = await app.transition();
      await Address.update({ sysDefault: 0 }, { where: { sysDefault: 1 }, transaction });
      result = await Address.update(address, { where: { uuid, version: version - 1 }, transaction });
    } else {
      result = await Address.update(address, { where: { uuid, version: version - 1 } });
    }

    app.checkUpdate(result);

    return address.uuid;
  };

  return Address;
};

