'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  return app.model.define('sequence', {
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
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'sequence',
  });
};
