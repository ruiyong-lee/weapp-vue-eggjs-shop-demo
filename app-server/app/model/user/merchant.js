'use strict';
const db = require('../../../database/db.js');

module.exports = app => {
  const merchantSchema = require('../../schema/merchant.js')(app);
  const Merchant = db.defineModel(app, 'merchant', merchantSchema);

  /**
   * 新增商家
   * @param {object} merchant - 条件
   * @return {string} - 商家uuid
   */
  Merchant.saveNew = async merchant => {
    await Merchant.create(merchant);
    return merchant.uuid;
  };

  /**
   * 修改商家
   * @param {object} merchant - 条件
   * @return {string} - 商家uuid
   */
  Merchant.saveModify = async merchant => {
    const {
      uuid, name, enableStatus, servicePhone, linkPhone, appId, appSecret, mchId,
      mchKey, linkMan, version, password, lastModifierId, lastModifierName,
    } = merchant;
    const updateField = {
      version, name, enableStatus, servicePhone, appId, appSecret, mchId,
      mchKey, linkPhone, linkMan, lastModifierId, lastModifierName,
    };

    if (password) {
      updateField.password = password;
    }

    const result = await Merchant.update(updateField, { where: { uuid, version: version - 1 } });

    app.checkUpdate(result);

    return uuid;
  };

  /**
   * 修改商家密码
   * @param {object} params - 条件
   * @return {string} - 商家uuid
   */
  Merchant.savePasswordModify = async params => {
    const { uuid, oldPassword, password, lastModifierId, lastModifierName } = params;
    const updateField = { password, lastModifierId, lastModifierName };
    const result = await Merchant.update(updateField, { where: { uuid, password: oldPassword } });

    app.checkUpdate(result, '旧密码不正确');

    return uuid;
  };

  /**
   * 查询商家分页列表
   * @param {object} { attributes, pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  Merchant.query = async ({ attributes, pagination = {}, filter = {}, sort = [] }) => {
    const { page, pageSize: limit } = pagination;
    const { keywordsLike, status } = filter;
    const order = app.getSortInfo(sort);
    const condition = {
      offset: (page - 1) * limit,
      limit,
      order,
      attributes,
      where: {},
    };

    if (status) {
      condition.where.enableStatus = status;
    }

    if (keywordsLike) {
      condition.where.$or = [
        { userName: { $like: `%%${keywordsLike}%%` } },
        { name: { $like: `%%${keywordsLike}%%` } },
        { linkMan: { $like: `%%${keywordsLike}%%` } },
        { linkPhone: { $like: `%%${keywordsLike}%%` } },
        { servicePhone: { $like: `%%${keywordsLike}%%` } },
      ];
    }

    const { count, rows } = await Merchant.findAndCountAll(condition);

    return { page, count, rows };
  };

  /**
   * 根据uuid获取商家
   * @param {object} { pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  Merchant.get = async ({ uuid, attributes }) => {
    const merchant = await Merchant.findById(uuid, {
      attributes,
    });

    return merchant;
  };

  return Merchant;
};

