/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('freightplan', {
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
    basicFreight: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    freeFreightAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sysDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    orgUuid: {
      type: DataTypes.STRING(38),
      allowNull: true
    }
  }, {
    tableName: 'freightplan'
  });
};
