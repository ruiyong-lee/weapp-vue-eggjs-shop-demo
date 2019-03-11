'use strict';

const Controller = require('../core/base_controller');

/**
 * Controller - freightPlan
 * @class
 * @author ruiyong-lee
 */
class FreightPlanController extends Controller {
  /**
   * 新增运费方案
   */
  async saveNew() {
    const { ctx } = this;

    try {
      const rule = {
        freightPlan: 'object',
      };
      ctx.validate(rule);
      const uuid = await ctx.service.freightPlan.saveNew(ctx.request.body);
      this.success(uuid);
    } catch (err) {
      const { fields = {}, name } = err;

      if (name === 'SequelizeUniqueConstraintError') {
        this.fail(ctx.UNIQUE_CODE, `名称：${fields.name} 的运费方案已存在`);
      } else {
        throw new Error(err);
      }
    }
  }

  /**
   * 修改运费方案
   */
  async saveModify() {
    const { ctx } = this;
    const rule = {
      freightPlan: 'object',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.freightPlan.saveModify(ctx.request.body);
    this.success(uuid);
  }

  /**
   * 删除运费方案
   */
  async remove() {
    const { ctx } = this;
    const { freightPlanUuid } = ctx.request.body;
    const uuid = await ctx.service.freightPlan.remove(freightPlanUuid);
    this.success(uuid);
  }

  /**
   * 获取运费方案分页列表
   */
  async query() {
    const { ctx } = this;
    const freightPlanData = await ctx.service.freightPlan.query({ ...ctx.request.body, ...ctx.query });
    this.success(freightPlanData);
  }

  /**
   * 根据uuid获取运费方案
   */
  async get() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const freightPlan = await ctx.service.freightPlan.get(uuid);
    this.success(freightPlan);
  }

  /**
   * 设置默认运费方案
   */
  async setDefault() {
    const { ctx } = this;
    const uuid = await ctx.service.freightPlan.setDefault(ctx.request.body);

    this.success(uuid);
  }
}

module.exports = FreightPlanController;
