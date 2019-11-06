import constants from './constants';

export default {
  // 用户类型转中文
  formatUserTypeToCN(type) {
    return constants.USER_TYPE_ENUM[type] || '';
  },
  // 账号状态转中文
  formatStautsToCN(status) {
    return constants.STATUS_ENUM[status] || '';
  },
  // 车辆状态转中文
  formatVehicleStautsToCN(status) {
    return constants.VEHICLE_STATUS_ENUM[status] || '';
  },
  // 车辆状态转对应样式
  formatVehicleStautsToClass(status) {
    return constants.VEHICLE_STATUS_CLASS[status] || '';
  },
  // 工作状态转中文
  formatWorkStautsToCN(status) {
    return constants.WORK_STATUS_ENUM[status] || '';
  },
  // 订单状态转中文
  formatOrderStautsToCN(status) {
    return constants.ORDER_STATUS_ENUM[status] || '';
  },
};
