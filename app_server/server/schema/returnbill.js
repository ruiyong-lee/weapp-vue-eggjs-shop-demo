/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('returnbill', {
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
    sourceBillNumber: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    returnTotalQty: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    refundAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false
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
    customerName: {
      type: DataTypes.STRING(76),
      allowNull: false
    },
    customerUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    }
  }, {
    tableName: 'returnbill'
  });
};
