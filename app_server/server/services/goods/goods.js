/**
 * goods | 业务操作
 */
const goodsModel = require('../../models/goods/goods')

module.exports = {

  /**
   * 构建带类别的商品Map
   * @param  无
   * @return {object|null} 构建结果
   */
  async getGoods (orgUuid) {
    let condition = {
      orgUuid: orgUuid,
      categoryAttributes: ['name'],
      goodsAttributes: ['uuid', 'code', 'name', 'categoryUuid', 'spec', 'mainImg', 'salePrice', 'unitName']
    }
    let resultList = await goodsModel.getGoods(condition)
    let goodsMap = {}

    for (let resultItem of resultList) {
      let goodsArr = []
      let key = resultItem.name
      let goodsList = resultItem.goods
      for (let goodsItem of goodsList) {
        let goods = {
          goods: {
            uuid: goodsItem.uuid,
            code: goodsItem.code,
            name: goodsItem.name
          },
          goodsCategory: {
            id: goodsItem.categoryUuid,
            name: goodsItem.name
          },
          goodsSpec: goodsItem.spec,
          salePrice: goodsItem.salePrice,
          mainImg: goodsItem.mainImg,
          unitName: goodsItem.unitName
        }

        goodsArr.push(goods)
      }
      goodsMap[key] = goodsArr
    }

    return goodsMap
  }
}
