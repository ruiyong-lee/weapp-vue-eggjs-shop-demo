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

  APP_PAGE_TOOLS: 'appPageTools', // 页面工具栏列表
  REFRESH_DATA_CALLBACK_MAP: 'refreshDataCallbackMap', // 控制页面局部数据刷新

  // 滚动条样式
  SCROLLBAR_OPTION: {
    barColor: '#5C9ACF',
    horizrailenabled: false,
  },

  // 状态
  ENABLE_STATUS: {
    0: '停用',
    1: '正常',
  },
  ENABLE_STATUS_CLASS: {
    0: 'text-red',
    1: 'text-green',
  },

  // 商品状态
  GOODS_STATUS: {
    up: '上架',
    down: '下架',
  },
  GOODS_STATUS_CLASS: {
    up: 'text-green',
    down: 'text-red',
  },
};
