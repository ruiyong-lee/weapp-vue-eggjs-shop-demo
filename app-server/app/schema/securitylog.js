'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  return app.model.define('securitylog', {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: STRING(2000),
      allowNull: true,
    },
    userName: {
      type: STRING(32),
      allowNull: false,
    },
    modifiedUserName: {
      type: STRING(76),
      allowNull: false,
    },
    modifiedUserUuid: {
      type: STRING(38),
      allowNull: false,
    },
    platform: {
      type: STRING(255),
      allowNull: false,
    },
    ip: {
      type: STRING(15),
      allowNull: false,
    },
    orgName: {
      type: STRING(76),
      allowNull: false,
    },
    orgUuid: {
      type: STRING(38),
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
    userIdentity: {
      type: STRING(20),
      allowNull: false,
    },
    operateName: {
      type: STRING(255),
      allowNull: false,
    },
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'securitylog',
  });
};
