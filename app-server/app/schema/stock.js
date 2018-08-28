'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, UUIDV1 } = app.Sequelize;

  return app.model.define('stock', {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    version: {
      type: BIGINT,
      allowNull: false,
      defaultValue: 0,
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
    warehouseUuid: {
      type: STRING(38),
      allowNull: true,
    },
    safetyStockQty: {
      type: DECIMAL,
      allowNull: true,
    },
    goodsCategoryUuid: {
      type: STRING(38),
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
    stockQty: {
      type: DECIMAL,
      allowNull: false,
    },
    goodsUuid: {
      type: STRING(38),
      allowNull: false,
    },
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'stock',
  });
};
