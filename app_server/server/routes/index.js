/**
 * 整合所有子路由
 */
const router = require('koa-router')()
const projectFlag = '/wechat-shop-demo/'

// goods
const goods = require('./goods/goods')

router.use(projectFlag, goods.routes(), goods.allowedMethods())

module.exports = router
