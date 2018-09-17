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
    transactionId: {
      type: STRING(38),
      allowNull: true,
    },
    orderBillNumber: {
      type: STRING(38),
      allowNull: true,
    },
    appId: {
      type: STRING(38),
      allowNull: true,
    },
    mchId: {
      type: STRING(38),
      allowNull: true,
    },
    openId: {
      type: STRING(38),
      allowNull: true,
    },
    bankType: {
      type: STRING(38),
      allowNull: true,
    },
    payTime: {
      type: DATE,
      allowNull: true,
    },
    totalFee: {
      type: DECIMAL,
      allowNull: true,
    },
    cashFee: {
      type: DECIMAL,
      allowNull: true,
    },
    version: BIGINT,
  };
};
