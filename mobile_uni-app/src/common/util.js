import fecha from 'fecha';
import isNull from 'lodash/isNull';
import omitBy from 'lodash/omitBy';
import round from 'lodash/round';

module.exports = {
  isNull,
  omitBy,
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
  // 字符串转对象，转换出错返回{}或者默认值
  jsonParse(str, defaultResult) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return defaultResult || {};
    }
  },
};
