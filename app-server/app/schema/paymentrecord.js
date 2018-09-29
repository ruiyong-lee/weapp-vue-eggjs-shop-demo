'use strict';

module.exports = app => {
  const { STRING, BIGINT, DECIMAL, DATE, UUIDV1 } = app.Sequelize;

  return {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    transactionId: STRING(38),
    orderBillNumber: STRING(38),
    appId: STRING(38),
    mchId: STRING(38),
    openId: STRING(38),
    bankType: STRING(38),
    payTime: DATE,
    totalFee: DECIMAL,
    cashFee: DECIMAL,
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
