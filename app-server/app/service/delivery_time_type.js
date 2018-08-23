'use strict';

const Service = require('egg').Service;

/**
 * Service - 收货时间
 * @class
 * @author ruiyong-lee
 */
class DeliveryTimeTypeService extends Service {
  /**
   * 查询收货时间列表
   * @param {Object} params 条件
   * @return {Array|Null} 查找结果
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
