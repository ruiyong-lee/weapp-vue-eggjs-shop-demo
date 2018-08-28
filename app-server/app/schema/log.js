'use strict';

module.exports = app => {
  const { STRING, DATE, UUIDV1 } = app.Sequelize;

  return app.model.define('log', {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    content: {
      type: STRING(2000),
      allowNull: true,
    },
    module: {
      type: STRING(255),
      allowNull: true,
    },
    orgName: {
      type: STRING(76),
      allowNull: false,
    },
    orgUuid: {
      type: STRING(38),
      allowNull: false,
    },
    entityKey: {
      type: STRING(255),
      allowNull: true,
    },
    platform: {
      type: STRING(20),
      allowNull: false,
    },
    operateTime: {
      type: DATE,
      allowNull: true,
    },
    operatorName: {
      type: STRING(76),
      allowNull: true,
    },
    operatorUuid: {
      type: STRING(38),
      allowNull: true,
    },
    operateName: {
      type: STRING(255),
      allowNull: false,
    },
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'log',
  });
};
