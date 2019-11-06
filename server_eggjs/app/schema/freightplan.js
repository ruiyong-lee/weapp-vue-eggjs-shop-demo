'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, BOOLEAN, UUIDV1 } = app.Sequelize;

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
    basicFreight: {
      type: DECIMAL,
      allowNull: false,
    },
    freeFreightAmount: DECIMAL,
    sysDefault: BOOLEAN,
    orgUuid: STRING(38),
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
