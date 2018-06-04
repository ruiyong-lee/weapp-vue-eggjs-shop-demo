'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE } = app.Sequelize;

  return app.model.define('customer', {
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
    orgUuid: {
      type: STRING(38),
      allowNull: false,
    },
    nickName: {
      type: STRING(76),
      allowNull: true,
    },
    openId: {
      type: STRING(38),
      allowNull: false,
    },
    unionId: {
      type: STRING(38),
      allowNull: true,
    },
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'customer',
  });
};
