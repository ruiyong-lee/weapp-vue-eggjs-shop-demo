'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, TEXT } = app.Sequelize;

  return app.model.define('goods', {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
    },
    version: {
      type: BIGINT,
      allowNull: false,
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
    costPrice: {
      type: DECIMAL,
      allowNull: true,
    },
    spec: {
      type: STRING(255),
      allowNull: true,
    },
    goodsInfo: {
      type: TEXT,
      allowNull: true,
    },
    unitName: {
      type: STRING(76),
      allowNull: false,
    },
    salePrice: {
      type: DECIMAL,
      allowNull: true,
    },
    atlasJsonStr: {
      type: STRING(2000),
      allowNull: true,
    },
    mainImg: {
      type: STRING(255),
      allowNull: true,
    },
    imagesJsonStr: {
      type: STRING(2000),
      allowNull: true,
    },
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'goods',
  });
};
