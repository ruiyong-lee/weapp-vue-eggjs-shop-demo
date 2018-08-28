'use strict';

const uuidv1 = require('uuid/v1');

module.exports = {
  uuidv1,
  dayFormat: '%Y-%m-%d',
  dayTimeFormat: '%Y-%m-%d %H:%i:%s',

  // 字符串转对象，转换出错返回{}或者默认值
  JSONParse(str, defaultResult) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return defaultResult || {};
    }
  },
  // create所需的一些公共字段
  getCrateInfo({ openId, nickName }) {
    return {
      creatorId: openId,
      creatorName: nickName,
      lastModifierId: openId,
      lastModifierName: nickName,
    };
  },
  // modify所需的一些公共字段
  getModifyInfo({ version, openId, nickName }) {
    return {
      version: version + 1,
      lastModifierId: openId,
      lastModifierName: nickName,
    };
  },
};
