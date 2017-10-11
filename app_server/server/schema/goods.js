/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('goods', {
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
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    categoryUuid: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    orgUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    costPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    spec: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    goodsInfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    unitName: {
      type: DataTypes.STRING(76),
      allowNull: false
    },
    salePrice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    atlasJsonStr: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    mainImg: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    imagesJsonStr: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  }, {
    tableName: 'goods'
  });
};
