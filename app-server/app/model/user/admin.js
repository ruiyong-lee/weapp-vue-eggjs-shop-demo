'use strict';
const db = require('../../../database/db.js');

module.exports = app => {
  const adminSchema = require('../../schema/admin.js')(app);
  const Admin = db.defineModel(app, 'admin', adminSchema);

  /**
   * 查找管理员
   * @param {Object} { uuid, attributes } 条件
   * @return {Object|Null} 查找结果
   */
  Admin.get = async ({ uuid, attributes }) => {
    return await Admin.findOne({
      attributes,
      where: { uuid },
    });
  };

  /**
   * 修改商家密码
   * @param {Object} params 条件
   * @return {String} 商家uuid
   */
  Admin.savePasswordModify = async params => {
    const { uuid, oldPassword, password, lastModifierId, lastModifierName } = params;
    const updateField = { password, lastModifierId, lastModifierName };
    const result = await Admin.update(updateField, { where: { uuid, password: oldPassword } });

    app.checkUpdate(result, '旧密码不正确');

    return uuid;
  };

  return Admin;
};

