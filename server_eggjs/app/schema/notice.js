'use strict';

module.exports = app => {
  const { STRING, DATE, BOOLEAN, UUIDV1 } = app.Sequelize;

  return {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    orgUuid: {
      type: STRING(38),
      allowNull: false,
    },
    createdTime: {
      type: DATE,
      allowNull: false,
    },
    lastModifiedTime: {
      type: DATE,
      allowNull: false,
    },
    title: STRING(255),
    content: STRING(2000),
    isRead: {
      type: BOOLEAN,
      defaultValue: false,
    },
  };
};
