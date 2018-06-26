'use strict';

const Service = require('egg').Service;

/**
 * Service - 商品
 * @class
 * @author ruiyong-lee
 */
class GoodsService extends Service {
  /**
   * 批量查询商品数据
   * @param {String} merchantUuid 商家uuid
   * @return {Object|null} 查找结果
   */
  async getGoods(merchantUuid) {
    const { app } = this;
    const goodsMap = {};
    const resultList = await app.model.Goods.getGoods({
      merchantUuid,
      categoryAttributes: [ 'name' ],
      goodsAttributes: [ 'uuid', 'code', 'name', 'categoryUuid', 'spec', 'mainImg', 'salePrice', 'unitName' ],
    });

    for (const resultItem of resultList) {
      const goodsArr = [];
      const key = resultItem.name;
      const goodsList = resultItem.goods;
      for (const goodsItem of goodsList) {
        const goods = {
          goods: {
            uuid: goodsItem.uuid,
            code: goodsItem.code,
            name: goodsItem.name,
          },
          goodsCategory: {
            id: goodsItem.categoryUuid,
            name: goodsItem.name,
          },
          goodsSpec: goodsItem.spec,
          salePrice: goodsItem.salePrice,
          mainImg: goodsItem.mainImg,
          unitName: goodsItem.unitName,
        };

        goodsArr.push(goods);
      }
      goodsMap[ key ] = goodsArr;
    }

    return goodsMap;
  }
}

module.exports = GoodsService;
