const Sequelize = require('sequelize') // 操作数据库的ORM
const Config = require('../../config')
const dbConfig = Config.database

// Sequelize初始化时设置一个连接池
const WeChatShop = new Sequelize(dbConfig.DATABASE, dbConfig.USERNAME, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
})

module.exports = {WeChatShop}
