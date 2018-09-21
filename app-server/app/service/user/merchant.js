'use strict';

const Service = require('egg').Service;

/**
 * Service - 商家
 * @class
 * @author ruiyong-lee
 */
class MerchantService extends Service {

  /**
   * 查找某个商家数据
   * @param {String} userName 商家账号
   * @param {String} password 商家密码
   * @return {Object|null} 查找结果
   */
  async getMerchantByLogin(userName, password) {
    return await this.app.mysql.get('merchant', { userName, password });
  }

  /**
   * 查找某个商家数据
   * @param {String} uuid 商家uuid
   * @return {Object|null} 查找结果
   */
  async getMerchant(uuid) {
    return await this.app.mysql.get('merchant', { uuid });
  }

  /**
   * 新增商家
   * @param {Object} params 条件
   * @return {String|Null} 商家uuid
   */
  async saveNew(params = {}) {
    let { merchant, userUuid, userName } = params;
    const { app } = this;
    const crateInfo = app.getCrateInfo(userUuid, userName);

    merchant = { ...merchant, ...crateInfo, userType: 'admin', enableStatus: true };

    return await app.model.User.Merchant.saveNew(merchant);
  }
}

module.exports = MerchantService;
