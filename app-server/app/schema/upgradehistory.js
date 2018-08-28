'use strict';

module.exports = app => {
  const { STRING, UUIDV1 } = app.Sequelize;

  return app.model.define('upgradehistory', {
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
  }, {
    createdAt: 'createdTime',
    updatedAt: 'lastModifiedTime',
    tableName: 'upgradehistory',
  });
};
