/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
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
    orgUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    nickName: {
      type: DataTypes.STRING(76),
      allowNull: true
    },
    openId: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    unionId: {
      type: DataTypes.STRING(38),
      allowNull: true
    }
  }, {
    tableName: 'customer'
  });
};
