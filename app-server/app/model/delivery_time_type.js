'use strict';

module.exports = app => {
  const { Sequelize, model, getSortInfo, checkUpdate, checkDelete } = app;
  const { Op } = Sequelize;
  const deliveryTimeTypeSchema = require('../schema/deliverytimetype.js')(app);
  const DeliveryTimeType = model.define('deliverytimetype', deliveryTimeTypeSchema);

  /**
   * 新增送货时间
   * @param {object} deliveryTimeType - 条件
   * @return {string} - 送货时间uuid
   */
  DeliveryTimeType.saveNew = async deliveryTimeType => {
    const result = await DeliveryTimeType.create(deliveryTimeType);
    return result.uuid;
  };

  /**
   * 修改送货时间
   * @param {object} deliveryTimeType - 条件
   * @return {string} - 送货时间uuid
   */
  DeliveryTimeType.saveModify = async deliveryTimeType => {
    const { uuid, name, version, orgUuid, lastModifierId, lastModifierName } = deliveryTimeType;
    const result = await DeliveryTimeType.update({ version, name, lastModifierId, lastModifierName }, { where: { uuid, orgUuid, version } });

    checkUpdate(result);

    return uuid;
  };

  /**
   * 删除送货时间
   * @param {object} { uuid, orgUuid } - 条件
   * @return {string} - 删除送货时间uuid
   */
  DeliveryTimeType.remove = async ({ uuid, orgUuid }) => {
    const result = await DeliveryTimeType.destroy({ where: { uuid, orgUuid } });

    checkDelete(result);

    return uuid;
  };

  /**
   * 查询送货时间分页列表
   * @param {object} { orgUuid, attributes, pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  DeliveryTimeType.query = async ({ orgUuid, attributes, pagination = {}, filter = {}, sort = [] }) => {
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

    const { count, rows } = await DeliveryTimeType.findAndCountAll(condition);

    return { page, count, rows };
  };

  /**
   * 查询送货时间列表
   * @param {object} { orgUuid, attributes, filter } - 条件
   * @return {object|null} - 查找结果
   */
  DeliveryTimeType.getList = async ({ orgUuid, attributes, filter = {} }) => {
    return await DeliveryTimeType.findAll({
      attributes,
      where: { ...filter, orgUuid },
    });
  };

  /**
   * 根据uuid获取送货时间
   * @param {object} { uuid, orgUuid, attributes } - 条件
   * @return {object|null} - 查找结果
   */
  DeliveryTimeType.get = async ({ uuid, orgUuid, attributes }) => {
    return await DeliveryTimeType.findOne({
      attributes,
      where: { uuid, orgUuid },
    });
  };

  return DeliveryTimeType;
};

