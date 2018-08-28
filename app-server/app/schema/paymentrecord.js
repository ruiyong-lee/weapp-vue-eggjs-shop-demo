'use strict';

module.exports = app => {
  const { STRING, DECIMAL, DATE, UUIDV1 } = app.Sequelize;

  return app.model.define('paymentrecord', {
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
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'paymentrecord',
  });
};
