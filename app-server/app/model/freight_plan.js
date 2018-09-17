'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const freightPlanSchema = require('../schema/freightplan.js')(app);
  const FreightPlan = db.defineModel(app, 'freightplan', freightPlanSchema);

  /**
   * 查找默认运费方案
   * @param {Object} { merchantUuid, attributes } 条件
   * @return {Object|Null} 查找结果
   */
  FreightPlan.getDefault = async ({ merchantUuid, attributes }) => {
    return await FreightPlan.findOne({
      attributes,
      where: { orgUuid: merchantUuid, sysDefault: 1 },
    });
  };

  return FreightPlan;
};

