'use strict';

const Controller = require('../core/base_controller');

/**
 * Controller - goods
 * @class
 * @author ruiyong-lee
 */
class GoodsController extends Controller {
  /**
   * 新增商品
   */
  async saveNew() {
    const { ctx } = this;
    const rule = {
      goods: 'object',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.goods.saveNew(ctx.request.body);
    this.success(uuid);
  }

  /**
   * 修改商品
   */
  async saveModify() {
    const { ctx } = this;
    const rule = {
      goods: 'object',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.goods.saveModify(ctx.request.body);
    this.success(uuid);
  }

  /**
   * 删除商品
   */
  async delete() {
    const { ctx } = this;
    const { categoryUuid } = ctx.request.body;
    const goodsCount = await ctx.service.goods.countGoodsByCategory(categoryUuid);

    if (goodsCount > 0) {
      this.fail(ctx.ERROR_CODE, '该商品尚有商品在使用，无法删除！');
    } else {
      const uuid = await ctx.service.goods.delete(categoryUuid);
      this.success(uuid);
    }
  }

  /**
   * 获取商品分页列表
   */
  async query() {
    const { ctx } = this;
    const goodsData = await ctx.service.goods.query({ ...ctx.request.body, ...ctx.query });
    this.success(goodsData);
  }

  /**
   * 根据uuid获取商品
   */
  async get() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const goods = await ctx.service.goods.get(uuid);
    this.success(goods);
  }
}

module.exports = GoodsController;
