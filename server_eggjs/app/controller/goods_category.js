'use strict';

const Controller = require('../core/base_controller');

/**
 * Controller - 商品类别
 * @class
 * @author ruiyong-lee
 */
class GoodsCategoryController extends Controller {
  /**
   * 新增类别
   */
  async saveNew() {
    const { ctx } = this;

    try {
      const rule = {
        goodsCategory: 'object',
      };
      ctx.validate(rule);
      const uuid = await ctx.service.goodsCategory.saveNew(ctx.request.body);
      this.success(uuid);
    } catch (err) {
      const { fields = {}, name } = err;

      if (name === 'SequelizeUniqueConstraintError') {
        this.fail(ctx.UNIQUE_CODE, `名称：${fields.name} 的类别已存在`);
      } else {
        throw new Error(err);
      }
    }
  }

  /**
   * 修改类别
   */
  async saveModify() {
    const { ctx } = this;
    const rule = {
      goodsCategory: 'object',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.goodsCategory.saveModify(ctx.request.body);
    this.success(uuid);
  }

  /**
   * 删除类别
   */
  async remove() {
    const { ctx } = this;
    const { uuid } = ctx.request.body;
    const goodsCount = await ctx.service.goods.countGoodsByCategory(uuid);

    if (goodsCount > 0) {
      this.fail(ctx.ERROR_CODE, '该类别尚有商品在使用，无法删除！');
    } else {
      const uuid = await ctx.service.goodsCategory.remove(ctx.request.body);
      this.success(uuid);
    }
  }

  /**
   * 获取类别分页列表
   */
  async query() {
    const { ctx } = this;
    const goodsCategoryData = await ctx.service.goodsCategory.query(ctx.request.body);
    this.success(goodsCategoryData);
  }

  /**
   * 获取类别下拉列表
   */
  async getDropdownList() {
    const { ctx } = this;
    const goodsCategoryList = await ctx.service.goodsCategory.getDropdownList(ctx.request.body);
    this.success(goodsCategoryList);
  }

  /**
   * 根据uuid获取类别
   */
  async get() {
    const { ctx } = this;
    const goodsCategory = await ctx.service.goodsCategory.get(ctx.request.body);
    this.success(goodsCategory);
  }
}

module.exports = GoodsCategoryController;
