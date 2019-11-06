'use strict';

module.exports = app => {
  const { STRING, BIGINT, UUIDV1 } = app.Sequelize;

  return {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    packageName: {
      type: STRING(255),
      allowNull: false,
    },
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
