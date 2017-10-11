/**
 * admin | 子路由
 */
const router = require('koa-router')()
const adminController = require('../../controllers/user/admin')

router.get('/admin/getAdminInfo.json', adminController.getAdminInfo)

const routers = router

module.exports = routers
