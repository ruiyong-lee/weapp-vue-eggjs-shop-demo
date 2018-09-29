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
    userIdentity: {
      type: STRING(20),
      allowNull: false,
    },
    operateName: {
      type: STRING(255),
      allowNull: false,
    },
    content: STRING(2000),
    operateTime: DATE,
    operatorName: STRING(76),
    operatorUuid: STRING(38),
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
