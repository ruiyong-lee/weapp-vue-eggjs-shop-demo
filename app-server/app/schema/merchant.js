'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, UUIDV1 } = app.Sequelize;

  return app.model.define('merchant', {
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
    name: {
      type: STRING(76),
      allowNull: false,
    },
    accountInfoUuid: {
      type: STRING(38),
      allowNull: true,
    },
    enableStatus: {
      type: STRING(20),
      allowNull: false,
    },
    registerPlatform: {
      type: STRING(20),
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
    sessionId: {
      type: STRING(38),
      allowNull: true,
    },
    address: {
      type: STRING(255),
      allowNull: true,
    },
    servicePhone: {
      type: STRING(12),
      allowNull: true,
    },
    orgName: {
      type: STRING(76),
      allowNull: true,
    },
    orgUuid: {
      type: STRING(38),
      allowNull: true,
    },
    userType: {
      type: STRING(20),
      allowNull: false,
    },
    linkPhone: {
      type: STRING(255),
      allowNull: true,
    },
    linkMan: {
      type: STRING(76),
      allowNull: true,
    },
    appId: {
      type: STRING(38),
      allowNull: true,
    },
    mchKey: {
      type: STRING(38),
      allowNull: true,
    },
    mchId: {
      type: STRING(38),
      allowNull: true,
    },
    appSecret: {
      type: STRING(38),
      allowNull: true,
    },
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'merchant',
  });
};
