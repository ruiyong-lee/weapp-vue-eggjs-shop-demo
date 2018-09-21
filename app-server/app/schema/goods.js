'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, TEXT, UUIDV1 } = app.Sequelize;

  return {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    lastModifiedTime: {
      type: DATE,
      allowNull: false,
    },
    lastModifierName: {
      type: STRING(76),
      allowNull: false,
    },
    lastModifierId: {
      type: STRING(38),
      allowNull: false,
    },
    createdTime: {
      type: DATE,
      allowNull: false,
    },
    creatorName: {
      type: STRING(76),
      allowNull: false,
    },
    creatorId: {
      type: STRING(38),
      allowNull: false,
    },
    name: {
      type: STRING(76),
      allowNull: false,
    },
    status: {
      type: STRING(20),
      allowNull: false,
    },
    code: {
      type: STRING(38),
      allowNull: false,
    },
    categoryUuid: {
      type: STRING(38),
      allowNull: true,
    },
    orgUuid: {
      type: STRING(38),
      allowNull: false,
    },
    unitName: {
      type: STRING(76),
      allowNull: false,
    },
    costPrice: DECIMAL,
    spec: STRING(255),
    goodsInfo: TEXT,
    salePrice: DECIMAL,
    atlasJsonStr: STRING(2000),
    mainImg: STRING(255),
    imagesJsonStr: STRING(2000),
    version: BIGINT,
  };
};
