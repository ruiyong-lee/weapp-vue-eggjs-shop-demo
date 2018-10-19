'use strict';

const Controller = require('../core/base_controller');
const path = require('path');
const fs = require('mz/fs');
const sendToWormhole = require('stream-wormhole');

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

    try {
      const rule = {
        goods: 'object',
      };
      ctx.validate(rule);
      const uuid = await ctx.service.goods.saveNew(ctx.request.body);
      this.success(uuid);
    } catch (err) {
      const { fields = {}, name } = err;

      if (name === 'SequelizeUniqueConstraintError') {
        this.fail(ctx.UNIQUE_CODE, `名称：${fields.name} 的商品已存在`);
      } else {
        throw new Error(err);
      }
    }
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
   * 测试上传 之后整理，不放在这里
   */
  async upload() {
    const { app, ctx } = this;
    const parts = ctx.multipart();
    let part;
    let result;

    while ((part = await parts()) != null) {
      // part 是上传的文件流
      if (part.length) {
        // 这是 busboy 的字段
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          return this.fail(ctx.ERROR_CODE, '请选择文件');
        }

        // 文件处理，本地环境上传到本地磁盘，生产环境上传到云存储
        try {
          if (app.config.env === 'production') {
            // result = await ctx.oss.put('egg-multipart-test/' + part.filename, part);
          } else {
            const fileName = `${ctx.helper.uuidv1()}.${part.mime.split('/')[1]}`;
            // 创建可写流
            const writerStream = fs.createWriteStream(path.join(this.config.baseDir, `app/public/upload/${fileName}`));

            // 目标写入流
            part.pipe(writerStream);
            result = `public/upload/${fileName}`;
          }
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
      }
    }

    this.success(result);
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
