'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const freightPlanSchema = require('../schema/freightplan.js')(app);
  const FreightPlan = db.defineModel(app, 'freightplan', freightPlanSchema);

  /**
   * 新增运费方案
   * @param {object} freightPlan - 条件
   * @return {string} - 运费方案uuid
   */
  FreightPlan.saveNew = async freightPlan => {
    const result = await FreightPlan.create(freightPlan);
    return result.uuid;
  };

  /**
   * 修改运费方案
   * @param {object} freightPlan - 条件
   * @return {string} - 运费方案uuid
   */
  FreightPlan.saveModify = async freightPlan => {
    const { uuid, name, version, basicFreight, freeFreightAmount, sysDefault } = freightPlan;
    const result = await FreightPlan.update({
      version, name, basicFreight, freeFreightAmount, sysDefault,
    }, {
      where: {
        uuid,
        version: version - 1,
      },
    });

    app.checkUpdate(result);

    return uuid;
  };

  /**
   * 删除运费方案
   * @param {object} uuid - 运费方案uuid
   * @return {string} - 删除运费方案uuid
   */
  FreightPlan.remove = async uuid => {
    const result = await FreightPlan.destroy({ where: { uuid } });

    app.checkDelete(result);

    return uuid;
  };

  /**
   * 查询运费方案分页列表
   * @param {object} { userUuid, attributes, pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  FreightPlan.query = async ({ userUuid, attributes, pagination = {}, filter = {} }) => {
    const { page, pageSize: limit } = pagination;
    const { count, rows } = await FreightPlan.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      attributes,
      where: { ...filter, orgUuid: userUuid },
      order: [['createdTime', 'DESC']],
    });

    return { page, count, rows };
  };

  /**
   * 根据uuid获取运费方案
   * @param {object} { pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  FreightPlan.get = async ({ uuid, attributes }) => {
    return await FreightPlan.findById(uuid, {
      attributes,
    });
  };

  /**
   * 查找默认运费方案
   * @param {object} { merchantUuid, attributes } - 条件
   * @return {object|null} - 查找结果
   */
  FreightPlan.getDefault = async ({ merchantUuid, attributes }) => {
    return await FreightPlan.findOne({
      attributes,
      where: { orgUuid: merchantUuid, sysDefault: 1 },
    });
  };

  /**
   * 设置默认运费方案
   * @param {object} { uuid } - 条件
   * @return {string|null} - 运费方案uuid
   */
  FreightPlan.setDefault = async ({ uuid }) => {
    const transaction = await app.transition();
    await FreightPlan.update({ sysDefault: 0 }, { where: { sysDefault: 1 }, transaction });
    await FreightPlan.update({ uuid, sysDefault: 1 }, { where: { uuid }, transaction });

    return uuid;
  };

  return FreightPlan;
};

