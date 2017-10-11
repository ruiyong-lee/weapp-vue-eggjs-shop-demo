/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paymentrecord', {
    uuid: {
      type: DataTypes.STRING(38),
      allowNull: false,
      primaryKey: true
    },
    transactionId: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    orderBillNumber: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    appId: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    mchId: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    openId: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    bankType: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    payTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    totalFee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    cashFee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'paymentrecord'
  });
};
