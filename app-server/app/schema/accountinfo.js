'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, UUIDV1 } = app.Sequelize;

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
    password: {
      type: STRING(100),
      allowNull: false,
    },
    userName: {
      type: STRING(12),
      allowNull: false,
      unique: true,
    },
    email: STRING(255),
    version: BIGINT,
  };
};
