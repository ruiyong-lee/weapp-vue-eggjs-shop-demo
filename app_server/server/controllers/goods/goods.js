/**
 * goods | 控制器
 */
const utils = require('../../utils/utils')
const goodsService = require('../../services/goods/goods')

module.exports = {

  /**
   * 获取带类别的商品Map
   * @param  {obejct} ctx 上下文对象
   */
  async getGoods (ctx) {
    let response = new utils.Response()
    let orgUuid = ctx.request.body.orgUuid
    let result = await goodsService.getGoods(orgUuid)

    response.data = result
    ctx.body = response
  }
}
