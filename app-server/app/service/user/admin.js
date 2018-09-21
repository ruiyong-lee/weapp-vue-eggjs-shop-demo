'use strict';

const Service = require('egg').Service;

/**
 * Service - admin
 * @class
 * @author ruiyong-lee
 */
class AdminService extends Service {
  /**
   * 查找某个管理员数据
   * @param {String} userName 管理员账号
   * @param {String} password 管理员密码
   * @return {Object|null} 查找结果
   */
  async getAdminByLogin(userName, password) {
    return await this.app.mysql.get('admin', { userName, password });
  }
}

module.exports = AdminService;
