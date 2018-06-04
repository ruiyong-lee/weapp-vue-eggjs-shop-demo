'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE } = app.Sequelize;

  return app.model.define('admin', {
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
    sessionId: {
      type: STRING(38),
      allowNull: true,
    },
    disabledReason: {
      type: STRING(255),
      allowNull: true,
    },
    registerPlatform: {
      type: STRING(20),
      allowNull: true,
    },
    accountInfoUuid: {
      type: STRING(38),
      allowNull: true,
      unique: true,
    },
    enableStatus: {
      type: STRING(20),
      allowNull: false,
    },
    authenticateStatus: {
      type: STRING(20),
      allowNull: false,
    },
    authenticateFailedReason: {
      type: STRING(255),
      allowNull: true,
    },
    remark: {
      type: STRING(255),
      allowNull: true,
    },
    registerIP: {
      type: STRING(15),
      allowNull: true,
    },
    userType: {
      type: STRING(20),
      allowNull: false,
    },
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'admin',
  });
};
