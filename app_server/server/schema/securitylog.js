/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('securitylog', {
    uuid: {
      type: DataTypes.STRING(38),
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    modifiedUserName: {
      type: DataTypes.STRING(76),
      allowNull: false
    },
    modifiedUserUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    platform: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    orgName: {
      type: DataTypes.STRING(76),
      allowNull: false
    },
    orgUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    operateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    operatorName: {
      type: DataTypes.STRING(76),
      allowNull: true
    },
    operatorUuid: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    userIdentity: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    operateName: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'securitylog'
  });
};
