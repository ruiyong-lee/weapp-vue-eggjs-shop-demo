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
    goodsCategoryUuid: STRING(38),
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
    stockInQty: {
      type: DECIMAL,
      allowNull: false,
    },
    billUuid: {
      type: STRING(38),
      allowNull: false,
      references: {
        model: 'stockinbill',
        key: 'uuid',
      },
    },
    goodsCategoryName: STRING(76),
    remark: STRING(255),
    goodsSpec: STRING(255),
    returnQty: DECIMAL,
  };
};
