'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, BOOLEAN } = app.Sequelize;

  return app.model.define('freightplan', {
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
    basicFreight: {
      type: DECIMAL,
      allowNull: false,
    },
    freeFreightAmount: {
      type: DECIMAL,
      allowNull: true,
    },
    sysDefault: {
      type: BOOLEAN,
      allowNull: true,
    },
    orgUuid: {
      type: STRING(38),
      allowNull: true,
    },
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'freightplan',
  });
};
