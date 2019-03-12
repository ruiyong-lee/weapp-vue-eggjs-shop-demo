'use strict';

const Service = require('egg').Service;

/**
 * Service - 送货时间
 * @class
 * @author ruiyong-lee
 */
class DeliveryTimeTypeService extends Service {
  /**
   * 新增送货时间
   * @param {object} params - 条件
   * @return {string} - 送货时间uuid
   */
  async saveNew(params = {}) {
    let { deliveryTimeType, userUuid, userName } = params;
    const { app } = this;
    const crateInfo = app.getCrateInfo(userUuid, userName);

    deliveryTimeType = { ...deliveryTimeType, ...crateInfo, orgUuid: userUuid };

    return await app.model.DeliveryTimeType.saveNew(deliveryTimeType);
  }

  /**
   * 修改送货时间
   * @param {object} params - 条件
   * @return {string|null} - 送货时间uuid
   */
  async saveModify(params = {}) {
    const { app } = this;
    let { deliveryTimeType, userUuid, userName } = params;
    const { version } = deliveryTimeType;
    const modifyInfo = app.getModifyInfo(version, userUuid, userName);

    deliveryTimeType = { ...deliveryTimeType, ...modifyInfo };

    return await app.model.DeliveryTimeType.saveModify(deliveryTimeType);
  }

  /**
   * 删除送货时间
   * @param {object} uuid - 送货时间uuid
   * @return {string|null} - 删除送货时间uuid
   */
  async remove(uuid) {
    const { app } = this;
    await app.model.DeliveryTimeType.remove(uuid);

    return uuid;
  }

  /**
   * 获取送货时间分页列表
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async query(params = {}) {
    const { app, ctx } = this;
    const { JSONParse } = ctx.helper;
    return await app.model.DeliveryTimeType.query({
      ...params,
      filter: JSONParse(params.filter),
      pagination: JSONParse(params.pagination),
      attributes: ['uuid', 'version', 'name', 'remark', 'surcharge', 'createdTime', 'lastModifiedTime'],
    });
  }

  /**
   * 根据uuid获取送货时间
   * @param {object} uuid 送货时间uuid
   * @return {object|null} 查找结果
   */
  async get(uuid) {
    const { app } = this;
    return await app.model.DeliveryTimeType.get({
      uuid,
      attributes: ['uuid', 'version', 'name', 'remark', 'surcharge', 'createdTime', 'lastModifiedTime'],
    });
  }

  /**
   * 查询送货时间列表
   * @param {object} params - 条件
   * @return {Array|null} - 查找结果
   */
  async getList(params = {}) {
    const { app } = this;
    const { Sequelize } = app;
    const resultList = await app.model.DeliveryTimeType.getList({
      ...params,
      attributes: ['uuid', 'name', 'remark', [Sequelize.fn('ROUND', Sequelize.col('surcharge'), 2), 'surcharge']],
    });

    return resultList;
  }
}

module.exports = DeliveryTimeTypeService;
