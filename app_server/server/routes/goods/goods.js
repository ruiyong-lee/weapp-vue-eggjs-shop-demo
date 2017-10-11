/**
 * goods | 子路由
 */
const router = require('koa-router')()
const goodsController = require('../../controllers/goods/goods')

router.post('goods/getGoods.json', goodsController.getGoods)

module.exports = router
