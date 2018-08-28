'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, UUIDV1 } = app.Sequelize;

  return app.model.define('accountinfo', {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    version: {
      type: BIGINT,
      allowNull: false,
      defaultValue: 0,
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
    email: {
      type: STRING(255),
      allowNull: true,
      unique: true,
    },
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'accountinfo',
  });
};
