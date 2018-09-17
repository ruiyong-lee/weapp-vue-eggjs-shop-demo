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
    status: {
      type: STRING(20),
      allowNull: true,
    },
    stockOutTotalQty: {
      type: DECIMAL,
      allowNull: false,
    },
    stockOutType: {
      type: STRING(20),
      allowNull: true,
    },
    remark: {
      type: STRING(255),
      allowNull: true,
    },
    orgUuid: {
      type: STRING(38),
      allowNull: false,
    },
    billNumber: {
      type: STRING(38),
      allowNull: false,
    },
    sourceBillNumber: {
      type: STRING(38),
      allowNull: true,
    },
    warehouseUuid: {
      type: STRING(255),
      allowNull: true,
    },
    version: BIGINT,
  };
};
