import fecha from 'fecha';
import sum from 'lodash/sum';
import add from 'lodash/add';
import multiply from 'lodash/multiply';
import round from 'lodash/round';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty';

module.exports = {
  sum,
  add,
  multiply,
  round,
  isArray,
  isObject,
  isNumber,
  isEmpty,

  // 日期格式化
  formatToDay(date = new Date()) {
    return fecha.format(date, 'YYYY-MM-DD');
  },
  formatToDayNoYear(date = new Date()) {
    return fecha.format(date, 'MM-DD');
  },
  formatToHourMinute(date = new Date()) {
    return fecha.format(date, 'HH:mm');
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
  formatDayStrToDayTimeStr(dateStr) {
    return `${dateStr} 00:00:00`;
  },
  // 计算耗时（时间差）单位：分
  calMinuteConsuming(prev = new Date(), later = new Date()) {
    const prevTime = prev.getTime();
    const laterTime = later.getTime();
    const differenceTime = laterTime - prevTime;

    return round(differenceTime / 60 / 1000);
  },
  // 字符串转时间
  convertStrToDate(str) {
    if (typeof str !== 'string') {
      return str;
    }
    const date = new Date(str);

    // ios兼容性
    if (!date || Number.isNaN(date.getTime())) {
      return new Date(str.replace(/-/g, '/'));
    }

    return date;
  },
  // 格式化倒计时
  formatCountDown(interval) {
    const maxInterval = 1800000; // 不超过30分钟
    const surplus = maxInterval - interval;
    const minute = parseInt(surplus / 60000, 10);
    const seconds = Math.ceil((surplus % 60000) / 1000);

    return surplus >= 0 ? `${minute}分${seconds}秒` : false;
  },
  // 字符串转对象，转换出错返回{}或者默认值
  jsonParse(str, defaultResult) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return defaultResult || {};
    }
  },
  // 获得字符串实际长度，中文2，英文1
  getStrRealLen(str = '') {
    let realLength = 0;
    let charCode = -1;
    const len = str.length;

    for (let i = 0; i < len; i += 1) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) realLength += 1;
      else realLength += 2;
    }
    return realLength;
  },
};
