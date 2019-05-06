'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, TEXT, UUIDV1, ENUM } = app.Sequelize;

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
      type: ENUM('up', 'down'),
      allowNull: false,
    },
    categoryUuid: STRING(38),
    orgUuid: {
      type: STRING(38),
      allowNull: false,
    },
    unitName: {
      type: STRING(76),
      allowNull: false,
    },
    spec: STRING(255),
    goodsInfo: TEXT,
    salePrice: DECIMAL,
    thumbnail: STRING(255),
    imagesJsonStr: STRING(2000),
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
