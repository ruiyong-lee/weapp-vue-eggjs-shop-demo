'use strict';

module.exports = app => {
  const { STRING, BIGINT, INTEGER } = app.Sequelize;

  return {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    createDate: {
      type: STRING(10),
      allowNull: false,
    },
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};
