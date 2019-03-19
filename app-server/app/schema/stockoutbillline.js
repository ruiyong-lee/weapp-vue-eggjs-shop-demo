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
    unitName: {
      type: STRING(76),
      allowNull: false,
    },
    goodsName: {
      type: STRING(76),
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
    goodsCategoryName: STRING(76),
    goodsCategoryUuid: STRING(38),
    remark: STRING(255),
    goodsSpec: STRING(255),
    orderQty: DECIMAL,
  };
};
