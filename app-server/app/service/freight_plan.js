'use strict';

const Service = require('egg').Service;

/**
 * Service - 运费方案
 * @class
 * @author ruiyong-lee
 */
class FreightPlanService extends Service {
  /**
   * 新增运费方案
   * @param {object} params - 条件
   * @return {string} - 运费方案uuid
   */
  async saveNew(params = {}) {
    let { freightPlan, userUuid, userName, orgUuid } = params;
    const { app } = this;
    const crateInfo = app.getCrateInfo(userUuid, userName);

    freightPlan = { ...freightPlan, ...crateInfo, orgUuid };

    return await app.model.FreightPlan.saveNew(freightPlan);
  }

  /**
   * 修改运费方案
   * @param {object} params - 条件
   * @return {string|null} - 运费方案uuid
   */
  async saveModify(params = {}) {
    const { app } = this;
    let { freightPlan, userUuid, userName, orgUuid } = params;
    const modifyInfo = app.getModifyInfo(userUuid, userName);

    freightPlan = { ...freightPlan, ...modifyInfo, orgUuid };

    return await app.model.FreightPlan.saveModify(freightPlan);
  }

  /**
   * 删除运费方案
   * @param {object} params - 条件
   * @return {string|null} - 删除运费方案uuid
   */
  async remove(params = {}) {
    const { app } = this;
    await app.model.FreightPlan.remove(params);

    return params.uuid;
  }

  /**
   * 获取运费方案分页列表
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async query(params = {}) {
    const { app } = this;
    return await app.model.FreightPlan.query({
      ...params,
      attributes: ['uuid', 'version', 'name', 'basicFreight', 'freeFreightAmount', 'sysDefault', 'createdTime', 'lastModifiedTime'],
    });
  }

  /**
   * 根据uuid获取运费方案
   * @param {object} params - 条件
   * @return {object|null} 查找结果
   */
  async get(params = {}) {
    const { app } = this;
    return await app.model.FreightPlan.get({
      ...params,
      attributes: ['uuid', 'version', 'name', 'basicFreight', 'freeFreightAmount', 'sysDefault', 'createdTime', 'lastModifiedTime'],
    });
  }

  /**
   * 查询默认运费方案
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async getDefault(params = {}) {
    const { app } = this;
    const { Sequelize } = app;
    return await app.model.FreightPlan.getDefault({
      ...params,
      attributes: ['uuid', 'basicFreight', [Sequelize.fn('ROUND', Sequelize.col('freeFreightAmount'), 2), 'freeFreightAmount']],
    });
  }

  /**
   * 设置默认运费方案
   * @param {object} params - 条件
   * @return {string|null} - 运费方案uuid
   */
  async setDefault(params = {}) {
    const { app } = this;
    return await app.model.FreightPlan.setDefault(params);
  }
}

module.exports = FreightPlanService;
