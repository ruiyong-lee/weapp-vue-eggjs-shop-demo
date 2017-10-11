/**
 * admin | 模型
 */
const db = require('../../utils/db')
const adminModelPath = './../../schema/admin'
const WeChatShopDb = db.WeChatShop // 引入数据库

const Admin = WeChatShopDb.import(adminModelPath) // 用sequelize的import方法引入表结构，实例化了Admin

// 根据uuid获取管理员
const getAdminByUuid = async (uuid) => {
  const admin = await Admin.findOne({
    where: {
      uuid: uuid
    }
  })
  return admin
}

module.exports = {
  getAdminByUuid
}
