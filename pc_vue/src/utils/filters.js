import { Constants } from './constants';

export default {
  // 账号状态转中文
  formatEnableStatusToCN(status) {
    return Constants.ENABLE_STATUS[status];
  },
  // 账号状态样式
  formatEnableStatusToClass(status) {
    return Constants.ENABLE_STATUS_CLASS[status];
  },
  // 订单状态转中文
  formatOrderStatusToCN(status) {
    return Constants.ORDER_STATUS[status];
  },
  // 订单状态样式
  formatOrderStatusToClass(status) {
    return Constants.ORDER_STATUS_CLASS[status];
  },
  // 商品状态转中文
  formatGoodsStatusToCN(status) {
    return Constants.GOODS_STATUS[status];
  },
  // 商品状态样式
  formatGoodsStatusToClass(status) {
    return Constants.GOODS_STATUS_CLASS[status];
  },
};
