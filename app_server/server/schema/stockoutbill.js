/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stockoutbill', {
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
    status: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    stockOutTotalQty: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    stockOutType: {
      type: DataTypes.STRING(20),
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
    billNumber: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    sourceBillNumber: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    warehouseUuid: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'stockoutbill'
  });
};
