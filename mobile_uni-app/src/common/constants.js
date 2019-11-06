// 常量

export default {
  // 用户信息
  TOKEN: 'token',
  USER: 'userInfo',
  USER_TYPE: 'userType',

  // 枚举
  USER_TYPE_ENUM: {
    DRIVER: '司机',
    EMPLOYEE: '员工',
  },
  STATUS_ENUM: {
    ENABLED: '可用',
    DISABLED: '不可用',
  },
  VEHICLE_STATUS_ENUM: {
    WORKING: '工作中',
    IN_FAULT: '故障中',
    MAINTAINING: '维修中',
    DISABLED: '不可用',
    ABORTED: '已报废',
  },
  VEHICLE_STATUS_CLASS: {
    FREE: 'text-green',
    WORKING: 'text-blue',
    IN_FAULT: 'text-red',
    MAINTAINING: 'text-orange',
    DISABLED: 'text-gray',
    ABORTED: 'text-gray',
  },
  VEHICLE_CATEGORY_ENUM: {
    FORKLIFT: '铲车',
    TRUCK: '货车',
  },
  WORK_STATUS_ENUM: {
    FREE: '待命中',
    WORKING: '工作中',
    LEAVING: '请假中',
  },
  ORDER_STATUS_ENUM: {
    INITIAL: '新建',
    AUDITED: '已审核',
    DISPATCHED: '已调度',
    TRANSPORTING: '进行中',
    FINISHED: '已完成',
    ABORTED: '已作废',
  },
  ORDER_STATUS_CLASS: {
    INITIAL: '',
    AUDITED: 'text-orange',
    DISPATCHED: 'text-red',
    TRANSPORTING: 'text-green',
    FINISHED: 'text-blue',
    ABORTED: 'text-gray',
  },
  ORDER_STATUS_OPTIONS: [
    { label: '进行中', value: 'TRANSPORTING' },
    { label: '已调度', value: 'DISPATCHED' },
    { label: '已完成', value: 'FINISHED' },
    { label: '待调度', value: ['INITIAL', 'AUDITED'] },
  ],
  CHARGE_TYPE_OPTIONS: [
    { label: '按车', value: 'TRUCK' },
    { label: '按票', value: 'ORDER' },
    { label: '包月', value: 'MONTH' },
    { label: '按方', value: 'CUBIC_METER ' },
  ],

  MAINTENANCE_COMPLETE: 'maintenance_complete', // 修完提车
  AMAP_WXA_KEY: '340f5e2d070f941377cc582e65e0c39f', // 高德地图小程序key
  AMAP_H5_KEY: '945db4904e83c198d2356be3edcb98d5', // 高德地图H5key

  // 长度相关
  INPUT_LENGTH: 200,
  TEXTAREA_LENGTH: 200,

  // 正则
  CELLPHONE_REGEX: /(^(0|86|17951)?1[0-9]{10}$)/,
  TELEPHONE_CELLPHONE_REGEX: /(^(0[0-9]{2,3}\\-)([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$)|((400|800)([0-9\\-]{7,10}))|(^(0|86|17951)?1[0-9]{10}$)/,
  PASSWORD_REGEX: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,

  // 错误提示
  UNLOAD_ERROR_TIP: '当前没有进行中的任务，无法卸车',
  SERVICE_ERROR_TIP: '网络连接中断，请检查网络后重试或者联系客服',
};
