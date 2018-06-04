'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, BOOLEAN } = app.Sequelize;

  return app.model.define('address', {
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
    address: {
      type: STRING(255),
      allowNull: false,
    },
    linkPhone: {
      type: STRING(20),
      allowNull: false,
    },
    sysDefault: {
      type: BOOLEAN,
      allowNull: true,
    },
    shopName: {
      type: STRING(76),
      allowNull: true,
    },
    linkMan: {
      type: STRING(76),
      allowNull: false,
    },
    openId: {
      type: STRING(38),
      allowNull: true,
    },
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'address',
  });
};
