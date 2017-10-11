/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
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
    sessionId: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    disabledReason: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    registerPlatform: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    accountInfoUuid: {
      type: DataTypes.STRING(38),
      allowNull: true,
      unique: true
    },
    enableStatus: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    authenticateStatus: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    authenticateFailedReason: {
      type: DataTypes.STRING(255),
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
    userType: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    tableName: 'admin'
  });
};
