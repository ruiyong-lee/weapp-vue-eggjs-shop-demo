'use strict';
const TRANSITION = Symbol('Application#transition');
// const HELPER = Symbol('Application#Helper');

module.exports = {
  // 事务
  async transition() {
    if (!this[TRANSITION]) {
      this[TRANSITION] = await this.model.transaction();
    }
    return this[TRANSITION];
  },
  getTransition() {
    return this[TRANSITION];
  },
  deleteTransition() {
    this[TRANSITION] = null;
  },

  // 单号生成，暂时是日期+6位
  async getBillNumber(prefix) {
    const date = new Date();
    const key = `${prefix || 'B'}${date.getYear()}${date.getMonth()}${date.getDate()}`;
    const value = await this.redis.get(key) || 0;

    await this.redis.setex(key, 3600 * 24, Number(value) + 1);

    return `${key}${String(value).padStart(6, '0')}`;
  },

  // 检查version
  checkUpdateVersion(arr, message) {
    if (arr.includes(0)) {
      const error = new Error(message || '已被修改过，请刷新后重试！');
      error.status = 422;
      throw error;
    }
  },
};
