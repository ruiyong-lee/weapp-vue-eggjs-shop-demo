/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
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
      allowNull: false
    },
    linkPhone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    sysDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    shopName: {
      type: DataTypes.STRING(76),
      allowNull: true
    },
    linkMan: {
      type: DataTypes.STRING(76),
      allowNull: false
    },
    openId: {
      type: DataTypes.STRING(38),
      allowNull: true
    }
  }, {
    tableName: 'address'
  });
};
