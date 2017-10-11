/**
 * admin | 控制器
 */
const admin = require('../../models/user/admin')

// 根据uuid获取管理员信息
const getAdminInfo = async (ctx) => {
  const uuid = ctx.params.uuid
  const request = await admin.getAdminByUuid(uuid)
  ctx.body = request
}

module.exports = {
  getAdminInfo
}
