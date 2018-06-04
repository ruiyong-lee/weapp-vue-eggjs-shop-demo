'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, BOOLEAN, DOUBLE } = app.Sequelize;

  return app.model.define('warehouse', {
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
      allowNull: true,
    },
    systemDefault: {
      type: BOOLEAN,
      allowNull: true,
    },
    remark: {
      type: STRING(255),
      allowNull: true,
    },
    orgUuid: {
      type: STRING(38),
      allowNull: false,
    },
    city: {
      type: STRING(255),
      allowNull: true,
    },
    district: {
      type: STRING(255),
      allowNull: true,
    },
    township: {
      type: STRING(255),
      allowNull: true,
    },
    poiName: {
      type: STRING(255),
      allowNull: true,
    },
    longitude: {
      type: DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: DOUBLE,
      allowNull: true,
    },
    poiAddress: {
      type: STRING(255),
      allowNull: true,
    },
    province: {
      type: STRING(255),
      allowNull: true,
    },
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'warehouse',
  });
};
