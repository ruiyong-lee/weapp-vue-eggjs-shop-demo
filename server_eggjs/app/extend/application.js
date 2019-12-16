'use strict';
const _ = require('lodash');
const fecha = require('fecha');

// TODO Redis好像无法对消息持久化存储，这个到时候再看下怎么改进
const handlers = {}; // 任务处理器map
const events = {}; // 任务类型map
const tasks = {}; // 任务列表
const delayEventKeyPrefix = 'delay_event_'; // 定时任务key前缀

const TRANSACTION = Symbol('Application#transaction');

module.exports = {
  _,
  dayFormat: '%Y-%m-%d',
  dayTimeFormat: '%Y-%m-%d %H:%i:%s',

  // 日期格式化
  formatToDay(date = new Date()) {
    return fecha.format(date, 'YYYY-MM-DD');
  },
  formatToDayNoYear(date = new Date()) {
    return fecha.format(date, 'MM-DD');
  },
  formatToDayStart(date = new Date()) {
    return fecha.format(date, 'YYYY-MM-DD 00:00:00');
  },
  formatToDayEnd(date = new Date()) {
    return fecha.format(date, 'YYYY-MM-DD 23:59:59');
  },
  formatToDayTime(date = new Date()) {
    return fecha.format(date, 'YYYY-MM-DD HH:mm:ss');
  },

  // 获取当前时间相差 count 天的时间
  getDifferDate(count = 0, date = new Date()) {
    const time = date.getTime();
    const oneDayTime = 86400000;

    return new Date(time + oneDayTime * count);
  },

  // 获取排序条件数组
  getSortInfo(sort) {
    return _.isEmpty(sort) ? [['createdTime', 'DESC']] : sort;
  },
  // create所需的一些公共字段
  getCrateInfo(creatorId, creatorName) {
    return {
      creatorId,
      creatorName,
      lastModifierId: creatorId,
      lastModifierName: creatorName,
    };
  },
  // modify所需的一些公共字段
  getModifyInfo(modifyId, modifyName) {
    return {
      lastModifierId: modifyId || 'system',
      lastModifierName: modifyName || 'system',
    };
  },

  // 事务
  async transaction() {
    if (!this[TRANSACTION]) {
      this[TRANSACTION] = await this.model.transaction();
    }
    return this[TRANSACTION];
  },
  getTransaction() {
    return this[TRANSACTION];
  },
  deleteTransaction() {
    this[TRANSACTION] = null;
  },

  // 单号生成，暂时是日期+6位
  async getBillNumber(prefix) {
    const dateStr = fecha.format(new Date(), 'YYYYMMDD');
    const key = `${prefix || 'B'}${dateStr}`;
    const value = await this.redis.get('default').get(key) || 1;

    await this.redis.get('default').setex(key, 3600 * 24, Number(value) + 1);

    return `${key}${String(value).padStart(6, '0')}`;
  },

  // 检查update
  checkUpdate(arr, message) {
    if (arr.includes(0)) {
      const error = new Error(message || '保存失败，请刷新后重试！');
      error.status = 422;
      throw error;
    }
  },
  // 检查delete
  checkDelete(count, message) {
    if (!count) {
      const error = new Error(message || '删除失败，请刷新后重试！');
      error.status = 422;
      throw error;
    }
  },

  // 任务处理
  registerTaskHandler(type, handler) {
    if (!type) {
      throw new Error('type不能为空');
    }
    if (!_.isFunction(handler)) {
      throw new Error('handler类型非function');
    }
    handlers[type] = handler;
    events[type] = true;
  },
  // 创建延迟任务
  addDelayTask(type, id, body = {}, delay = 3600) {
    const key = `${delayEventKeyPrefix}${type}_${id}`;
    const taskKey = `${type}_${id}`;

    this.redis.get('default').setex(key, delay, 'delay_task', err => {
      if (err) {
        return console.log('添加延迟任务失败：', err);
      }
      console.log('添加延迟任务成功');
      tasks[taskKey] = body;
    });
  },
  // 订阅和处理延迟任务
  initDelayTask() {
    // 订阅
    this.redis.get('subscribe').psubscribe('__keyevent@0__:expired');

    // 处理
    this.redis.get('subscribe').on('pmessage', (pattern, channel, message) => {
      // 匹配key
      const result = message.match(new RegExp(`^${delayEventKeyPrefix}(${this._.keys(events).join('|')})_(\\S+)$`));

      if (result) {
        const type = result[1];
        const id = result[2];
        const handler = handlers[type];

        if (_.isFunction(handler)) {
          const taskKey = `${type}_${id}`;
          if (tasks[taskKey]) {
            handler(id, tasks[taskKey]);
            tasks[taskKey] = null;
          } else {
            console.log(`未找到延迟任务：type=${type}, id=${id}`);
          }
        } else {
          console.log(`未找到任务处理器：type=${type}`);
        }
      }
    });
  },
};
