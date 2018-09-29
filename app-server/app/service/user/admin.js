'use strict';

const md5 = require('md5');
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
   * @return {Object|null} 查找结果q
   */
  async getAdminByLogin(userName, password) {
    return await this.app.mysql.get('admin', { userName, password: md5(password) });
  }

  /**
   * 修改管理员密码
   * @param {Object} params 条件
   * @return {String|Null} 商家uuid
   */
  async savePasswordModify(params = {}) {
    const { app } = this;
    const { userUuid, userName, oldPassword, newPassword } = params;
    const modifyInfo = app.getModifyInfo(0, userUuid, userName);

    return await app.model.User.Admin.savePasswordModify({
      uuid: userUuid,
      oldPassword: md5(oldPassword),
      password: md5(newPassword),
      ...modifyInfo,
    });
  }
}

module.exports = AdminService;
