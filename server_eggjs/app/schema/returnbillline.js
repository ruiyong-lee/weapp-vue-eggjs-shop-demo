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
    returnPrice: {
      type: DECIMAL,
      allowNull: false,
    },
    returnQty: {
      type: DECIMAL,
      allowNull: false,
    },
    billUuid: {
      type: STRING(38),
      allowNull: false,
      references: {
        model: 'returnbill',
        key: 'uuid',
      },
    },
    goodsCategoryName: STRING(76),
    goodsCategoryUuid: STRING(38),
    goodsSpec: STRING(255),
    remark: STRING(255),
    sourceBillLineUuid: STRING(38),
    goodsPic: STRING(255),
  };
};
