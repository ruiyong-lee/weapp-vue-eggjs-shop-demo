/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('goodsorder', {
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    addressUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    goodsTotalQty: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    deliveryTimeTypeSurcharge: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    paymentAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    reductionAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    deliveryTimeTypeName: {
      type: DataTypes.STRING(76),
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    deliveryTimeTypeUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    deliveryTimeTypeRemark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    freightAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    linkPhone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    orgUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    shopName: {
      type: DataTypes.STRING(76),
      allowNull: true
    },
    billNumber: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    linkMan: {
      type: DataTypes.STRING(76),
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
    tableName: 'goodsorder'
  });
};
