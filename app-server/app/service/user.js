'use strict';

const Service = require('egg').Service;

/**
 * Service - 用户
 * @class
 * @author ruiyong-lee
 */
class UserService extends Service {
  /**
   * 查找一个商家数据
   * @param {String} uuid 商家uuid
   * @return {Object|null} 查找结果
   */
  async getMerchant(uuid) {
    const merchant = await this.app.mysql.get('merchant', { uuid });
    return merchant;
  }
}

module.exports = UserService;
