'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const deliveryTimeTypeSchema = require('../schema/deliverytimetype.js')(app);
  const DeliveryTimeType = db.defineModel(app, 'deliverytimetype', deliveryTimeTypeSchema);

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
    const { uuid, name, version } = deliveryTimeType;
    const result = await DeliveryTimeType.update({ version, name }, { where: { uuid, version: version - 1 } });

    app.checkUpdate(result);

    return uuid;
  };

  /**
   * 删除送货时间
   * @param {object} uuid - 送货时间uuid
   * @return {string} - 删除送货时间uuid
   */
  DeliveryTimeType.remove = async uuid => {
    const result = await DeliveryTimeType.destroy({ where: { uuid } });

    app.checkDelete(result);

    return uuid;
  };

  /**
   * 查询送货时间分页列表
   * @param {object} { userUuid, attributes, pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  DeliveryTimeType.query = async ({ userUuid, attributes, pagination = {}, filter = {} }) => {
    const { page, pageSize: limit } = pagination;
    const { count, rows } = await DeliveryTimeType.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      attributes,
      where: { ...filter, orgUuid: userUuid },
      order: [['createdTime', 'DESC']],
    });

    return { page, count, rows };
  };

  /**
   * 查询送货时间列表
   * @param {object} { userUuid, attributes, filter } - 条件
   * @return {object|null} - 查找结果
   */
  DeliveryTimeType.getList = async ({ userUuid, attributes, filter = {} }) => {
    return await DeliveryTimeType.findAll({
      attributes,
      where: { ...filter, orgUuid: userUuid },
    });
  };

  /**
   * 根据uuid获取送货时间
   * @param {object} { pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  DeliveryTimeType.get = async ({ uuid, attributes }) => {
    return await DeliveryTimeType.findById(uuid, {
      attributes,
    });
  };

  /**
   * 查找送货时间
   * @param {object} { merchantUuid, attributes } - 条件
   * @return {Array|null} - 查找结果
   */
  DeliveryTimeType.getList = async ({ merchantUuid, attributes }) => {
    return await DeliveryTimeType.findAll({
      attributes,
      where: { orgUuid: merchantUuid },
    });
  };

  return DeliveryTimeType;
};

