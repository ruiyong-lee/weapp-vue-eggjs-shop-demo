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
    salePrice: {
      type: DECIMAL,
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
    goodsQty: {
      type: DECIMAL,
      allowNull: false,
    },
    billUuid: {
      type: STRING(38),
      allowNull: false,
      references: {
        model: 'goodsorder',
        key: 'uuid',
      },
    },
    hasReturnQty: DECIMAL,
    goodsPic: STRING(255),
    goodsSpec: STRING(255),
    goodsCategoryName: STRING(76),
    goodsCategoryUuid: STRING(38),
    remark: STRING(255), // 暂时没用，后面整理去掉
  };
};
