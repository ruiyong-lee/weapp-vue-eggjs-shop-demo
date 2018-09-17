'use strict';

const fs = require('fs');
const path = require('path');
const folderPath = path.join('./', 'app/schema');
const uuidv1 = require('uuid/v1');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 初始化数据库
    const adminUuid = uuidv1();
    const accountInfoUuid = uuidv1();

    fs.readdir(folderPath, async (err, files) => {
      const files1 = files.filter(file => !file.includes('line'));
      const files2 = files.filter(file => file.includes('line'));

      [...files1, ...files2].forEach(async fileName => {
        try {
          const filePath = path.join('../../app/schema/', fileName);
          const schema = require(filePath)({ Sequelize });
          await queryInterface.createTable(fileName.replace('.js', ''), schema);
        } catch (e) {
          console.log(e);
        }
      });

      // 添加管理员
      try {
        await queryInterface.bulkInsert('admin', [{
          uuid: adminUuid,
          lastModifiedTime: new Date(),
          lastModifierName: 'system',
          lastModifierId: 'system',
          createdTime: new Date(),
          creatorName: 'system',
          creatorId: 'system',
          name: '超级管理员',
          registerPlatform: 'service',
          accountInfoUuid,
          enableStatus: 'enabled',
          userType: 'superAdmin',
          version: 0,
        }]);
        await queryInterface.bulkInsert('accountinfo', [{
          uuid: accountInfoUuid,
          lastModifiedTime: new Date(),
          lastModifierName: 'system',
          lastModifierId: 'system',
          createdTime: new Date(),
          creatorName: 'system',
          creatorId: 'system',
          password: new Date(),
          userName: 'superAdmin',
          version: 0,
        }]);
      } catch (e) {
        console.log(e);
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
