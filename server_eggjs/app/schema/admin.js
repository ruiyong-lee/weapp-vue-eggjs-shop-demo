'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, UUIDV1, ENUM } = app.Sequelize;

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
    // enabled: '启用', disabled: '禁用'
    enableStatus: {
      type: ENUM('enabled', 'disabled'),
      allowNull: false,
    },
    userType: {
      type: ENUM('admin'),
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
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
