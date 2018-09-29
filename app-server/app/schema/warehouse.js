'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, BOOLEAN, DOUBLE, UUIDV1 } = app.Sequelize;

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
    orgUuid: {
      type: STRING(38),
      allowNull: false,
    },
    status: STRING(20),
    systemDefault: BOOLEAN,
    remark: STRING(255),
    province: STRING(255),
    city: STRING(255),
    district: STRING(255),
    township: STRING(255),
    poiName: STRING(255),
    longitude: DOUBLE,
    latitude: DOUBLE,
    poiAddress: STRING(255),
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
