// utils - constants 常量

// 正则表达式
export const Pattern = {
  userName: /^[a-zA-Z0-9_-]{1,16}$/,
};

export const Constants = {
  MERCHANT: 'merchant',
  ORDER: 'order',
  GOODS_CATEGORY: 'goodsCategory',
  REFRESH_DATA_CALLBACK_MAP: 'refreshDataCallbackMap', // 控制页面局部数据刷新

  // 状态
  ENABLE_STATUS: {
    0: '停用',
    1: '正常',
  },
  ENABLE_STATUS_CLASS: {
    0: 'text-red',
    1: 'text-green',
  },
};
