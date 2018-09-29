'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, BOOLEAN, UUIDV1 } = app.Sequelize;

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
    address: {
      type: STRING(255),
      allowNull: false,
    },
    linkPhone: {
      type: STRING(20),
      allowNull: false,
    },
    linkMan: {
      type: STRING(76),
      allowNull: false,
    },
    openId: {
      type: STRING(38),
      allowNull: false,
    },
    sysDefault: BOOLEAN,
    shopName: STRING(76),
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
