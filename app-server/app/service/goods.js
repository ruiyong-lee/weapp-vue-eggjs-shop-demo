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
   * @param {string} merchantUuid - 商家uuid
   * @return {object|null} - 查找结果
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
   * @param {string} categoryUuid - 类别uuid
   * @return {number} - 商品数量
   */
  async countGoodsByCategory(categoryUuid) {
    return await this.app.model.Goods.countGoodsByCategory(categoryUuid);
  }

  /**
   * 获取商品分页列表
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async query(params = {}) {
    const { app, ctx } = this;
    const goodsData = await app.model.Goods.query({
      ...params,
      filter: ctx.helper.JSONParse(params.filter),
      pagination: ctx.helper.JSONParse(params.pagination),
      attributes: ['uuid', 'version', 'name', 'status', 'unitName', 'spec', 'goodsInfo', 'salePrice', 'mainImg', 'categoryUuid'],
    });

    if (goodsData.count > 0) {
      for (const row of goodsData.rows) {
        const { categoryUuid } = row || {};
        const goodsCategory = await app.model.GoodsCategory.get({
          uuid: categoryUuid,
          attributes: ['name'],
        });

        if (!app._.isEmpty(goodsCategory)) {
          row.dataValues.categoryName = goodsCategory.name;
        }
      }
    }

    return goodsData;
  }

  /**
   * 获取商品
   * @param {sting} uuid - 商品uuid
   * @return {object|null} - 查找结果
   */
  async get(uuid) {
    const { app } = this;
    const goodsData = await app.model.Goods.get(uuid);

    return goodsData;
  }
}

module.exports = GoodsService;
