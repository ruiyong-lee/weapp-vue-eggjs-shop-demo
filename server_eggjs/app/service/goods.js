'use strict';

const Service = require('egg').Service;

/**
 * Service - 商品
 * @class
 * @author ruiyong-lee
 */
class GoodsService extends Service {
  /**
   * 新增商品
   * @param {object} params - 条件
   * @return {string} - 商品uuid
   */
  async saveNew(params = {}) {
    let { goods, userUuid, userName, orgUuid } = params;
    const { app } = this;
    const crateInfo = app.getCrateInfo(userUuid, userName);

    goods = { ...goods, ...crateInfo, orgUuid };

    return await app.model.Goods.saveNew(goods);
  }

  /**
   * 修改商品
   * @param {object} params - 条件
   * @return {string|null} - 商品uuid
   */
  async saveModify(params = {}) {
    const { app } = this;
    let { goods, userUuid, userName, orgUuid } = params;
    const modifyInfo = app.getModifyInfo(userUuid, userName);

    goods = { ...goods, ...modifyInfo, orgUuid };

    return await app.model.Goods.saveModify(goods);
  }

  /**
   * 上架商品
   * @param {object} params - 条件
   * @return {string|null} - 商品uuid
   */
  async up(params) {
    const { app } = this;
    const { uuid, userUuid, userName, orgUuid, version } = params;
    const modifyInfo = app.getModifyInfo(userUuid, userName);
    const goods = { uuid, orgUuid, version, status: 'up', ...modifyInfo };

    await app.model.Goods.saveModify(goods);

    return uuid;
  }

  /**
   * 下架商品
   * @param {object} params - 条件
   * @return {string|null} - 商品uuid
   */
  async down(params) {
    const { app } = this;
    const { uuid, userUuid, userName, orgUuid, version } = params;
    const modifyInfo = app.getModifyInfo(userUuid, userName);
    const goods = { uuid, orgUuid, version, status: 'down', ...modifyInfo };

    await app.model.Goods.saveModify(goods);

    return uuid;
  }

  /**
   * 获取key为类别的商品数据
   * @param {string} orgUuid - 商家uuid
   * @return {object|null} - 查找结果
   */
  async getGoodsWithCategory(orgUuid) {
    const { app } = this;
    const goodsList = [];
    const resultList = await app.model.Goods.getGoodsWithCategory({
      orgUuid,
      categoryAttributes: ['uuid', 'name'],
      goodsAttributes: ['uuid', 'name', 'categoryUuid', 'spec', 'thumbnail', 'salePrice', 'unitName'],
    });

    for (const resultItem of resultList) {
      const { uuid, name: label, goods: lines } = resultItem || {};

      lines.forEach(item => {
        item.dataValues.categoryName = label;
      });
      goodsList.push({ uuid, label, lines });
    }

    return goodsList;
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
    const { app } = this;
    const goodsData = await app.model.Goods.query({
      ...params,
      attributes: ['uuid', 'version', 'name', 'status', 'unitName', 'spec', 'goodsInfo', 'salePrice', 'thumbnail', 'categoryUuid'],
    });

    if (goodsData.count > 0) {
      for (const row of goodsData.rows) {
        const { categoryUuid: uuid } = row || {};
        const { orgUuid } = params;
        const goodsCategory = await app.model.GoodsCategory.get({
          uuid,
          orgUuid,
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
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async get(params) {
    const { app, ctx } = this;
    const goodsData = await app.model.Goods.get(params) || {};
    const { categoryUuid: uuid, orgUuid } = goodsData;
    const goodsCategory = await app.model.GoodsCategory.get({
      uuid,
      orgUuid,
      attributes: ['name'],
    }) || {};


    if (!app._.isEmpty(goodsData)) {
      goodsData.dataValues.categoryName = goodsCategory.name;
    } else {
      ctx.throw(200, '查询不到指定的商品');
    }

    return goodsData;
  }
}

module.exports = GoodsService;
