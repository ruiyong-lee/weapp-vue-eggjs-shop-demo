'use strict';

const Service = require('egg').Service;

/**
 * Service - 用户
 * @class
 * @author ruiyong-lee
 */
class UserService extends Service {
  /**
   * 查找某个管理员数据
   * @param {String} userName 管理员账号
   * @param {String} password 管理员密码
   * @return {Object|null} 查找结果
   */
  async getAdminByLogin(userName, password) {
    return await this.app.mysql.get('admin', { userName, password });
  }

  /**
   * 查找某个管理员数据
   * @param {String} uuid 管理uuid
   * @return {Object|null} 查找结果
   */
  async getAdmin(uuid) {
    return await this.app.mysql.get('admin', { uuid });
  }

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
}

module.exports = UserService;
