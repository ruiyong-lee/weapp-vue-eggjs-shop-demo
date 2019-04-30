'use strict';
const uuidv1 = require('uuid/v1');

module.exports = app => {
  const { STRING, BIGINT, DATE, ENUM } = app.Sequelize;
  const uuid = uuidv1(); // 这里单独引入是为了默认保持uuid和orgUuid的统一

  return {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: uuid,
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
    enableStatus: {
      type: STRING(20),
      allowNull: false,
    },
    userType: {
      type: ENUM('merchant', 'employee'),
      allowNull: false,
    },
    userName: {
      type: STRING(12),
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING(100),
      allowNull: false,
    },
    remark: STRING(255),
    address: STRING(255),
    servicePhone: STRING(12),
    orgName: STRING(76),
    orgUuid: {
      type: STRING(38),
      defaultValue: uuid,
    },
    linkPhone: STRING(255),
    linkMan: STRING(76),
    appId: STRING(38),
    mchKey: STRING(38),
    mchId: STRING(38),
    appSecret: STRING(38),
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
