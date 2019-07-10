'use strict';

const uuidv1 = require('uuid/v1');

module.exports = {
  uuidv1,

  // 字符串转对象，转换出错返回{}或者默认值
  JSONParse(str, defaultResult) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return defaultResult || {};
    }
  },

  // 封装socket.io数据格式
  parseSocketMsg(action, payload = {}, metadata = {}) {
    return {
      meta: { timestamp: Date.now(), ...metadata },
      data: { action, payload },
    };
  },
};
