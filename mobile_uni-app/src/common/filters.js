import constants from './constants';

export default {
  // 布尔值转中文
  formatBooleanToCN(bool) {
    return bool ? '是' : '否';
  },
  // 订单状态转中文
  formatOrderStautsToCN(status) {
    return constants.ORDER_STATUS_LABELS[status] || '';
  },
};
