'use strict';

const Service = require('egg').Service;

/**
 * Service - 统计
 * @class
 * @author ruiyong-lee
 */
class StatisticsService extends Service {
  /**
   * 获取今日订单数量统计
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async getForDay(params = {}) {
    const { app } = this;
    const result = {};
    const start = app.formatToDayStart();
    const end = app.formatToDayEnd();
    const orderList = await app.model.GoodsOrder.getList({
      ...params,
      filter: {
        daterange: [start, end],
        status: ['initial', 'audited', 'dispatching', 'completed'],
      },
      attributes: ['status'],
    }) || [];

    result.total = orderList.length;
    orderList.forEach(item => {
      const { status } = item;

      if (result[status]) {
        result[status] += 1;
      } else {
        result[status] = 1;
      }
    });

    return result;
  }

  /**
   * 获取近七天订单统计
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async getForWeek(params = {}) {
    const { app } = this;
    const { formatToDayNoYear, formatToDayStart, formatToDayEnd, getDifferDate, _ } = app;
    const start = formatToDayStart(getDifferDate(-7));
    const end = formatToDayEnd();
    const orderList = await app.model.GoodsOrder.getList({
      ...params,
      filter: {
        daterange: [start, end],
        status: ['initial', 'audited', 'dispatching', 'completed'],
      },
      attributes: ['goodsTotalQty', 'paymentAmount', 'totalAmount', 'createdTime'],
    }) || [];
    const line = { goodsTotalQty: 0, paymentAmount: 0, totalAmount: 0, orderQty: 0 };
    const result = {
      [formatToDayNoYear(getDifferDate(-6))]: _.cloneDeep(line),
      [formatToDayNoYear(getDifferDate(-5))]: _.cloneDeep(line),
      [formatToDayNoYear(getDifferDate(-4))]: _.cloneDeep(line),
      [formatToDayNoYear(getDifferDate(-3))]: _.cloneDeep(line),
      [formatToDayNoYear(getDifferDate(-2))]: _.cloneDeep(line),
      [formatToDayNoYear(getDifferDate(-1))]: _.cloneDeep(line),
      [formatToDayNoYear()]: _.cloneDeep(line),
    };

    orderList.forEach(item => {
      const { goodsTotalQty = 0, paymentAmount = 0, totalAmount = 0, createdTime } = item;
      const timeStr = formatToDayNoYear(new Date(createdTime));

      if (!_.isEmpty(result[timeStr])) {
        result[timeStr].goodsTotalQty = _.round(_.add(result[timeStr].goodsTotalQty, Number(goodsTotalQty)), 4);
        result[timeStr].paymentAmount = _.round(_.add(result[timeStr].paymentAmount, Number(paymentAmount)), 2);
        result[timeStr].totalAmount = _.round(_.add(result[timeStr].totalAmount, Number(totalAmount)), 2);
        result[timeStr].orderQty += 1;
      }
    });

    return result;
  }
}

module.exports = StatisticsService;
