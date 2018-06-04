'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL } = app.Sequelize;

  return app.model.define('stockoutbill', {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
    },
    version: {
      type: BIGINT,
      allowNull: false,
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
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'stockoutbill',
  });
};
