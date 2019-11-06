'use strict';

module.exports = app => {
  const { model, checkUpdate } = app;
  const adminSchema = require('../../schema/admin.js')(app);
  const Admin = model.define('admin', adminSchema);

  /**
   * 查找管理员
   * @param {object} { uuid, attributes } - 条件
   * @return {object|null} - 查找结果
   */
  Admin.get = async ({ uuid, attributes }) => {
    return await Admin.findOne({
      attributes,
      where: { uuid },
    });
  };

  /**
   * 修改商家密码
   * @param {object} params - 条件
   * @return {string} - 商家uuid
   */
  Admin.savePasswordModify = async params => {
    const { uuid, oldPassword, password, lastModifierId, lastModifierName } = params;
    const result = await Admin.update({ password, lastModifierId, lastModifierName }, {
      where: {
        uuid,
        password: oldPassword,
      },
    });

    checkUpdate(result, '旧密码不正确');

    return uuid;
  };

  return Admin;
};

