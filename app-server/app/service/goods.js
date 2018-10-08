'use strict';

const Service = require('egg').Service;

/**
 * Service - 商品
 * @class
 * @author ruiyong-lee
 */
class GoodsService extends Service {
  /**
   * 获取key为类别的商品数据
   * @param {String} merchantUuid 商家uuid
   * @return {Object|Null} 查找结果
   */
  async getGoodsWithCategory(merchantUuid) {
    const { app } = this;
    const goodsMap = {};
    const resultList = await app.model.Goods.getGoodsWithCategory({
      merchantUuid,
      categoryAttributes: ['name'],
      goodsAttributes: ['uuid', 'code', 'name', 'categoryUuid', 'spec', 'mainImg', 'salePrice', 'unitName'],
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
      goodsMap[key] = goodsArr;
    }

    return goodsMap;
  }

  /**
   * 获取某类别的商品数量
   * @param {String} categoryUuid 类别uuid
   * @return {Number|Null} 商品数量
   */
  async countGoodsByCategory(categoryUuid) {
    return await this.app.model.Goods.countGoodsByCategory(categoryUuid);
  }
}

module.exports = GoodsService;
