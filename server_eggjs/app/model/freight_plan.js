'use strict';

module.exports = app => {
  const { Sequelize, model, getSortInfo, checkUpdate, checkDelete } = app;
  const { Op } = Sequelize;
  const freightPlanSchema = require('../schema/freightplan.js')(app);
  const FreightPlan = model.define('freightplan', freightPlanSchema);

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
    const { uuid, name, version, basicFreight, freeFreightAmount, sysDefault, orgUuid, lastModifierId, lastModifierName } = freightPlan;
    const result = await FreightPlan.update({
      version, name, basicFreight, freeFreightAmount, sysDefault, lastModifierId, lastModifierName,
    }, {
      where: { uuid, orgUuid, version },
    });

    checkUpdate(result);

    return uuid;
  };

  /**
   * 删除运费方案
   * @param {object} { uuid, orgUuid } - 条件
   * @return {string} - 删除运费方案uuid
   */
  FreightPlan.remove = async ({ uuid, orgUuid }) => {
    const result = await FreightPlan.destroy({ where: { uuid, orgUuid } });

    checkDelete(result);

    return uuid;
  };

  /**
   * 查询运费方案分页列表
   * @param {object} { orgUuid, attributes, pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  FreightPlan.query = async ({ orgUuid, attributes, pagination = {}, filter = {}, sort = [] }) => {
    const { page, pageSize: limit } = pagination;
    const { keywordsLike } = filter;
    const order = getSortInfo(sort);
    const condition = {
      offset: (page - 1) * limit,
      limit,
      order,
      attributes,
      where: { orgUuid },
    };

    if (keywordsLike) {
      condition.where.name = { [Op.like]: `%%${keywordsLike}%%` };
    }

    const { count, rows } = await FreightPlan.findAndCountAll(condition);

    return { page, count, rows };
  };

  /**
   * 根据uuid获取运费方案
   * @param {object} { uuid, orgUuid, attributes } - 条件
   * @return {object|null} - 查找结果
   */
  FreightPlan.get = async ({ uuid, orgUuid, attributes }) => {
    return await FreightPlan.findOne({
      attributes,
      where: { uuid, orgUuid },
    });
  };

  /**
   * 查找默认运费方案
   * @param {object} { orgUuid, attributes } - 条件
   * @return {object|null} - 查找结果
   */
  FreightPlan.getDefault = async ({ orgUuid, attributes }) => {
    return await FreightPlan.findOne({
      attributes,
      where: { orgUuid, sysDefault: 1 },
    });
  };

  /**
   * 设置默认运费方案
   * @param {object} { uuid } - 条件
   * @return {string|null} - 运费方案uuid
   */
  FreightPlan.setDefault = async ({ uuid, orgUuid }) => {
    const transaction = await app.transaction();
    await FreightPlan.update({ sysDefault: 0 }, { where: { sysDefault: 1 }, transaction });
    await FreightPlan.update({ uuid, sysDefault: 1 }, { where: { uuid, orgUuid }, transaction });

    return uuid;
  };

  return FreightPlan;
};

