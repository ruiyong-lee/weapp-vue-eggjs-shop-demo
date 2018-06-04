'use strict';
const co = require('co');

module.exports = {
  up: co.wrap(function* (db, Sequelize) {
    // const { STRING, INTEGER, DATE } = Sequelize;

    // yield db.createTable('users', {
    //   id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    //   name: { type: STRING, allowNull: false },
    //   email: { type: STRING, allowNull: false },
    //   created_at: DATE,
    //   updated_at: DATE,
    // });

    yield db.removeColumn('goods', 'thumbnail');
  }),

  down: co.wrap(function* (db, Sequelize) {
    // yield db.dropTable('users');
  }),
};
