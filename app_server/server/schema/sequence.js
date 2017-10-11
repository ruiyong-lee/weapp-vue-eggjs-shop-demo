/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sequence', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    createDate: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'sequence'
  });
};
