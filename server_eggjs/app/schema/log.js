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
    orgName: {
      type: STRING(76),
      allowNull: false,
    },
    orgUuid: {
      type: STRING(38),
      allowNull: false,
    },
    platform: {
      type: STRING(20),
      allowNull: false,
    },
    operateName: {
      type: STRING(255),
      allowNull: false,
    },
    content: STRING(2000),
    module: STRING(255),
    entityKey: STRING(255),
    operateTime: DATE,
    operatorName: STRING(76),
    operatorUuid: STRING(38),
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
