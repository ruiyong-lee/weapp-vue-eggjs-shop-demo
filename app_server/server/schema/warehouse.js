/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('warehouse', {
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
    status: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    systemDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    orgUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    district: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    township: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    poiName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    longitude: {
      type: "DOUBLE",
      allowNull: true
    },
    latitude: {
      type: "DOUBLE",
      allowNull: true
    },
    poiAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'warehouse'
  });
};
