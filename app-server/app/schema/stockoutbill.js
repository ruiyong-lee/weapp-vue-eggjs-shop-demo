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
    stockOutTotalQty: {
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
    status: STRING(20),
    stockOutType: STRING(20),
    remark: STRING(255),
    sourceBillNumber: STRING(38),
    warehouseUuid: STRING(255),
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
