'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, UUIDV1 } = app.Sequelize;

  return {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    lastModifiedTime: {
      type: DATE,
      allowNull: false,
    },
    lastModifierName: {
      type: STRING(76),
      allowNull: false,
    },
    lastModifierId: {
      type: STRING(38),
      allowNull: false,
    },
    createdTime: {
      type: DATE,
      allowNull: false,
    },
    creatorName: {
      type: STRING(76),
      allowNull: false,
    },
    creatorId: {
      type: STRING(38),
      allowNull: false,
    },
    sourceBillNumber: {
      type: STRING(38),
      allowNull: false,
    },
    returnTotalQty: {
      type: STRING(255),
      allowNull: false,
    },
    refundAmount: {
      type: DECIMAL,
      allowNull: false,
    },
    orgUuid: {
      type: STRING(38),
      allowNull: false,
    },
    billNumber: {
      type: STRING(38),
      allowNull: false,
    },
    customerName: {
      type: STRING(76),
      allowNull: false,
    },
    customerUuid: {
      type: STRING(38),
      allowNull: false,
    },
    status: STRING(20),
    remark: STRING(255),
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
