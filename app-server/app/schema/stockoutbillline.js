'use strict';

module.exports = app => {
  const { STRING, DECIMAL, UUIDV1 } = app.Sequelize;

  return {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    stockOutQty: {
      type: DECIMAL,
      allowNull: false,
    },
    goodsCategoryName: {
      type: STRING(76),
      allowNull: true,
    },
    goodsCategoryUuid: {
      type: STRING(38),
      allowNull: true,
    },
    remark: {
      type: STRING(255),
      allowNull: true,
    },
    unitName: {
      type: STRING(76),
      allowNull: false,
    },
    goodsSpec: {
      type: STRING(255),
      allowNull: true,
    },
    goodsName: {
      type: STRING(76),
      allowNull: false,
    },
    goodsCode: {
      type: STRING(38),
      allowNull: false,
    },
    goodsUuid: {
      type: STRING(38),
      allowNull: false,
    },
    billUuid: {
      type: STRING(38),
      allowNull: false,
      references: {
        model: 'stockoutbill',
        key: 'uuid',
      },
    },
    orderQty: {
      type: DECIMAL,
      allowNull: true,
    },
  };
};
