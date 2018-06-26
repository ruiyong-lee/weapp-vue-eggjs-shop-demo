'use strict';
const co = require('co');

module.exports = {
  up: co.wrap(async (db, Sequelize) => {
    // const { STRING, INTEGER, DATE } = Sequelize;

    // await db.createTable('users', {
    //   id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    //   name: { type: STRING, allowNull: false },
    //   email: { type: STRING, allowNull: false },
    //   created_at: DATE,
    //   updated_at: DATE,
    // });

    // await db.removeColumn('goods', 'created_at');
  }),

  down: co.wrap(async (db, Sequelize) => {
    // await db.addColumn('goods', 'created_at');
  }),
};
