'use strict';

const md5 = require('md5');
const Service = require('egg').Service;

/**
 * Service - 商家
 * @class
 * @author ruiyong-lee
 */
class MerchantService extends Service {
  /**
   * 查找某个商家数据
   * @param {string} userName - 商家账号
   * @param {string} password - 商家密码
   * @return {object|null} - 查找结果
   */
  async getMerchantByLogin(userName, password) {
    return await this.app.mysql.get('merchant', { userName, password: md5(password) });
  }

  /**
   * 新增商家
   * @param {object} params - 条件
   * @return {string|null} - 商家uuid
   */
  async saveNew(params = {}) {
    let { merchant, userUuid, userName } = params;
    const { app } = this;
    const crateInfo = app.getCrateInfo(userUuid, userName);

    merchant = {
      ...merchant,
      ...crateInfo,
      password: md5(merchant.password),
      orgName: merchant.name,
      userType: 'merchant',
      enableStatus: true,
    };

    return await app.model.User.Merchant.saveNew(merchant);
  }

  /**
   * 修改商家
   * @param {object} params - 条件
   * @return {string|null} - 商家uuid
   */
  async saveModify(params = {}) {
    const { app } = this;
    let { merchant, userUuid, userName } = params;
    const { password } = merchant;
    const modifyInfo = app.getModifyInfo(userUuid, userName);

    if (password) {
      merchant.password = md5(password);
    }

    merchant = { ...merchant, ...modifyInfo };

    return await app.model.User.Merchant.saveModify(merchant);
  }

  /**
   * 修改商家密码
   * @param {object} params - 条件
   * @return {string|null} - 商家uuid
   */
  async savePasswordModify(params = {}) {
    const { app } = this;
    const { userUuid, userName, oldPassword, newPassword } = params;
    const modifyInfo = app.getModifyInfo(userUuid, userName);

    return await app.model.User.Merchant.savePasswordModify({
      uuid: userUuid,
      oldPassword: md5(oldPassword),
      password: md5(newPassword),
      ...modifyInfo,
    });
  }

  /**
   * 获取商家分页列表
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async query(params = {}) {
    const { app } = this;
    return await app.model.User.Merchant.query({
      ...params,
      attributes: [
        'uuid', 'version', 'createdTime', 'name', 'enableStatus',
        'userName', 'servicePhone', 'linkPhone', 'linkMan',
      ],
    });
  }

  /**
   * 根据uuid获取商家
   * @param {object} uuid - 商家uuid
   * @param {object} userType - 用户类型
   * @return {object|null} - 查找结果
   */
  async get(uuid) {
    const { app } = this;
    return await app.model.User.Merchant.get({
      uuid,
      attributes: [
        'uuid', 'version', 'name', 'enableStatus', 'userName', 'servicePhone',
        'linkPhone', 'linkMan', 'address', 'appId', 'appSecret', 'mchId', 'mchKey',
      ],
    });
  }
}

module.exports = MerchantService;
