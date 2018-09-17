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
    name: {
      type: STRING(76),
      allowNull: false,
    },
    sessionId: {
      type: STRING(38),
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
    version: BIGINT,
  };
};
