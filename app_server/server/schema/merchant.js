/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('merchant', {
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
    name: {
      type: DataTypes.STRING(76),
      allowNull: false
    },
    accountInfoUuid: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    enableStatus: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    registerPlatform: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    registerIP: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    sessionId: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    servicePhone: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    orgName: {
      type: DataTypes.STRING(76),
      allowNull: true
    },
    orgUuid: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    userType: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    linkPhone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    linkMan: {
      type: DataTypes.STRING(76),
      allowNull: true
    },
    appId: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    mchKey: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    mchId: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    appSecret: {
      type: DataTypes.STRING(38),
      allowNull: true
    }
  }, {
    tableName: 'merchant'
  });
};
