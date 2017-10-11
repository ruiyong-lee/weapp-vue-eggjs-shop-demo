/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log', {
    uuid: {
      type: DataTypes.STRING(38),
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    module: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    orgName: {
      type: DataTypes.STRING(76),
      allowNull: false
    },
    orgUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    entityKey: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    platform: {
      type: DataTypes.STRING(20),
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
    operateName: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'log'
  });
};
