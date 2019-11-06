// utils - constants 常量

// 正则表达式
export const Pattern = {
  userName: /^[a-zA-Z0-9_-]{1,16}$/,
};

export const Constants = {
  MERCHANT: 'merchant',
  ORDER: 'order',
  GOODS: 'goods',
  GOODS_CATEGORY: 'goodsCategory',
  FREIGHT_PLAN: 'freightPlan',
  DELIVERY_TIME_TYPE: 'deliveryTimeType',
  NOTICE: 'notice',

  APP_PAGE_TOOLS: 'appPageTools', // 页面工具栏列表
  REFRESH_DATA_CALLBACK_MAP: 'refreshDataCallbackMap', // 控制页面局部数据刷新

  // 账号状态
  ENABLE_STATUS: {
    0: '停用',
    1: '正常',
  },
  // 账号状态样式
  ENABLE_STATUS_CLASS: {
    0: 'text-red',
    1: 'text-green',
  },
  // 订单状态
  ORDER_STATUS: {
    initial: '待付款',
    audited: '待发货',
    dispatching: '待收货',
    completed: '已完成',
    canceled: '已取消',
  },
  // 订单状态样式
  ORDER_STATUS_CLASS: {
    initial: 'bg-red',
    audited: 'bg-primary',
    dispatching: 'bg-green',
    completed: 'bg-dark-gray',
    canceled: 'bg-gray',
  },
  // 商品状态
  GOODS_STATUS: {
    up: '上架',
    down: '下架',
  },
  // 商品状态样式
  GOODS_STATUS_CLASS: {
    up: 'bg-green',
    down: 'bg-red',
  },
};
