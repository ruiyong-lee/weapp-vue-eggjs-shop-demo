/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('upgradehistory', {
    uuid: {
      type: DataTypes.STRING(38),
      allowNull: false,
      primaryKey: true
    },
    packageName: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'upgradehistory'
  });
};
