/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stock', {
    uuid: {
      type: DataTypes.STRING(38),
      allowNull: false,
      primaryKey: true
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    lastModifiedTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastModifierName: {
      type: DataTypes.STRING(76),
      allowNull: false
    },
    lastModifierId: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    creatorName: {
      type: DataTypes.STRING(76),
      allowNull: false
    },
    creatorId: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    warehouseUuid: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    safetyStockQty: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    goodsCategoryUuid: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    orgUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    stockQty: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    goodsUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    }
  }, {
    tableName: 'stock'
  });
};
