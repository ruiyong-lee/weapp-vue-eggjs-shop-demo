'use strict';

const Controller = require('../core/base_controller');
const uuidv1 = require('uuid/v1');

/**
 * Controller - 微信小程序
 * @class
 * @author ruiyong-lee
 */
class WeappController extends Controller {
  /**
   * 获取类别和商品列表
   */
  async getGoods() {
    const { ctx } = this;
    const { merchantUuid } = ctx.request.body;
    const rule = {
      merchantUuid: 'string',
    };
    ctx.validate(rule);
    const goods = await ctx.service.goods.getGoods(merchantUuid);

    this.success(goods);
  }

  /**
   * 获取订单列表
   */
  async queryOrderBill() {
    const { ctx } = this;
    const rule = {
      merchantUuid: 'string',
      page: { type: 'int', min: 1 },
      pageSize: 'int',
    };
    ctx.validate(rule);
    const goods = await ctx.service.goodsOrder.query(ctx.request.body);

    this.success(goods);
  }

  /**
   * 获取订单列表
   */
  async getOrderBill() {
    const { ctx } = this;
    const { uuid } = ctx.request.body;
    const rule = {
      uuid: 'string',
    };
    ctx.validate(rule);
    const goods = await ctx.service.goodsOrder.get(uuid);

    this.success(goods);
  }

  /**
   * 登录
   * @return {Function|null} 登录结果
   */
  async login() {
    const { ctx, app, _ } = this;
    const { merchantUuid, code } = ctx.request.body;
    const sessionid = uuidv1();

    // 根据merchantUuid获取商家
    const merchant = await ctx.service.user.getMerchant(merchantUuid);

    if (_.isEmpty(merchant)) {
      return this.fail(999, '该应用未绑定商家');
    }

    // 登录凭证校验
    const weappInfo = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${merchant.appId}&secret=${merchant.appSecret}&js_code=${code}&grant_type=authorization_code`, {
      dataType: 'json',
    }) || {};

    const { openid, session_key } = weappInfo.data || {};

    if (openid) {
      const result = JSON.stringify({ openid, session_key });
      // 保存openid和session_key到redis
      await app.redis.setex(sessionid, 3600 * 24, result);
    } else {
      return this.fail(999, weappInfo.data.errmsg);
    }

    this.success(sessionid);
  }
}

module.exports = WeappController;
