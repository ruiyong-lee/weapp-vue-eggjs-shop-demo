'use strict';

const Service = require('egg').Service;

/**
 * Service - 地址
 * @class
 * @author ruiyong-lee
 */
class AddressService extends Service {
  /**
   * 根据uuid获取用户地址
   * @param {Object} uuid 条件
   * @return {Object|Null} 查找结果
   */
  async get(uuid) {
    const { app } = this;
    const address = await app.model.User.Customer.Address.get({
      uuid,
      attributes: ['uuid', 'version', 'linkMan', 'linkPhone', 'shopName', 'address', 'sysDefault'],
    });

    return address;
  }

  /**
   * 获取用户默认地址
   * @param {Object} params 条件
   * @return {Object|Null} 查找结果
   */
  async getDefault(params = {}) {
    const { app } = this;
    const address = await app.model.User.Customer.Address.getDefault({
      ...params,
      attributes: ['uuid', 'linkMan', 'linkPhone', 'shopName', 'address'],
    });

    return address;
  }

  /**
   * 设置用户默认地址
   * @param {Object} params 条件
   * @return {Object|Null} 查找结果
   */
  async setDefault(params = {}) {
    const { app } = this;
    const uuid = await app.model.User.Customer.Address.setDefault(params);

    return uuid;
  }

  /**
   * 删除用户地址
   * @param {Object} params 条件
   * @return {Object|Null} 查找结果
   */
  async delete(params = {}) {
    const { app } = this;
    const uuid = await app.model.User.Customer.Address.delete(params);

    return uuid;
  }

  /**
   * 获取用户地址列表
   * @param {Object} params 条件
   * @return {Array|Null} 查找结果
   */
  async getList(params = {}) {
    const { app } = this;
    const address = await app.model.User.Customer.Address.getList({
      ...params,
      attributes: ['uuid', 'linkMan', 'linkPhone', 'shopName', 'address', 'sysDefault'],
    });

    return address;
  }

  /**
   * 新增用户地址
   * @param {Object} params 条件
   * @return {String|Null} 用户地址uuid
   */
  async saveNew(params = {}) {
    let { address, openId, nickName } = params;
    const { app } = this;
    const crateInfo = app.getCrateInfo(openId, nickName);

    address = { ...address, ...crateInfo, openId };

    return await app.model.User.Customer.Address.saveNew(address);
  }

  /**
   * 修改用户地址
   * @param {Object} params 条件
   * @return {String|Null} 查找结果
   */
  async saveModify(params = {}) {
    let { address } = params;
    const { app } = this;
    const { version } = address;
    const modifyInfo = app.getModifyInfo({ version, ...params });

    address = { ...address, ...modifyInfo };

    return await app.model.User.Customer.Address.saveModify(address);
  }
}

module.exports = AddressService;
