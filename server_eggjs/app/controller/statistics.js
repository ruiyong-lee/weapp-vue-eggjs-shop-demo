'use strict';

const Controller = require('../core/base_controller');

/**
 * Controller - 统计
 * @class
 * @author ruiyong-lee
 */
class StatisticsController extends Controller {
  /**
   * 获取今日订单数量统计
   */
  async getForDay() {
    const { ctx } = this;
    const result = await ctx.service.statistics.getForDay(ctx.request.body);

    this.success(result);
  }

  /**
   * 获取近七天订单统计
   */
  async getForWeek() {
    const { ctx } = this;
    const result = await ctx.service.statistics.getForWeek(ctx.request.body);

    this.success(result);
  }
}

module.exports = StatisticsController;
