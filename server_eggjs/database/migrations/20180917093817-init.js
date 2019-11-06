'use strict';

const fs = require('fs');
const path = require('path');
const folderPath = path.join('./', 'app/schema');
const uuidv1 = require('uuid/v1');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const files = fs.readdirSync(folderPath);

      // 初始化数据库
      for (const fileName of files) {
        const filePath = path.join('../../app/schema/', fileName);
        const schema = require(filePath)({ Sequelize });
        await queryInterface.createTable(fileName.replace('.js', ''), schema);
      }

      // 添加管理员
      await queryInterface.bulkInsert('admin', [{
        uuid: uuidv1(),
        lastModifiedTime: new Date(),
        lastModifierName: 'system',
        lastModifierId: 'system',
        createdTime: new Date(),
        creatorName: 'system',
        creatorId: 'system',
        name: '管理员',
        enableStatus: 'enabled',
        userType: 'admin',
        userName: 'admin', // 账号：admin
        password: '21232f297a57a5a743894a0e4a801fc3', // 密码：admin
        version: 0,
      }]);
    } catch (e) {
      console.log(e);
    }
  },

  down: async queryInterface => {
    // 删除所有表
    await queryInterface.dropAllTables();
  },
};
