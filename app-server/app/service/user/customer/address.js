'use strict';

const Service = require('egg').Service;

/**
 * Service - 地址
 * @class
 * @author ruiyong-lee
 */
class AddressService extends Service {
  /**
   * 获取当前用户默认地址
   * @param {Object} params 参数
   * @return {Object|Null} 查找结果
   */
  async getDefault(params = {}) {
    const { app } = this;
    const address = await app.model.User.Customer.Address.getDefault(Object.assign(params, {
      attributes: ['uuid', 'linkMan', 'linkPhone', 'shopName', 'address'],
    }));

    return address;
  }
}

module.exports = AddressService;
