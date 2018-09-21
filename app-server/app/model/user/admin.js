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

  return Admin;
};

