'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  return app.model.define('upgradehistory', {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
    },
    packageName: {
      type: STRING(255),
      allowNull: false,
    },
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'upgradehistory',
  });
};
