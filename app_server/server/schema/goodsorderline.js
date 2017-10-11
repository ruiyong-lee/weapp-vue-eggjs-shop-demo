/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('goodsorderline', {
    uuid: {
      type: DataTypes.STRING(38),
      allowNull: false,
      primaryKey: true
    },
    goodsCategoryName: {
      type: DataTypes.STRING(76),
      allowNull: true
    },
    goodsCategoryUuid: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    unitName: {
      type: DataTypes.STRING(76),
      allowNull: false
    },
    salePrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    goodsSpec: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    goodsName: {
      type: DataTypes.STRING(76),
      allowNull: false
    },
    goodsCode: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    goodsUuid: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    hasReturnQty: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    goodsPic: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    goodsQty: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    billUuid: {
      type: DataTypes.STRING(38),
      allowNull: false,
      references: {
        model: 'goodsorder',
        key: 'uuid'
      }
    }
  }, {
    tableName: 'goodsorderline'
  });
};
