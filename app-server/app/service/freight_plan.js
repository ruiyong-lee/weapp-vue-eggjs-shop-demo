'use strict';

const Service = require('egg').Service;

/**
 * Service - 运费方案
 * @class
 * @author ruiyong-lee
 */
class FreightPlanService extends Service {
  /**
   * 查询默认运费方案
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async getDefault(params = {}) {
    const { app } = this;
    const { Sequelize } = app;
    const resultList = await app.model.FreightPlan.getDefault({
      ...params,
      attributes: ['uuid', 'basicFreight', [Sequelize.fn('ROUND', Sequelize.col('freeFreightAmount'), 2), 'freeFreightAmount']],
    });

    return resultList;
  }
}

module.exports = FreightPlanService;
