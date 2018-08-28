'use strict';

const Controller = require('../core/base_controller');

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
   * 获取商家运费方案
   */
  async getDefaultFreightPlan() {
    const { ctx } = this;
    const freightPlan = await ctx.service.freightPlan.getDefault(ctx.request.body);

    this.success(freightPlan);
  }

  /**
   * 获取收货时间列表
   */
  async getDeliveryTimeTypeList() {
    const { ctx } = this;
    const list = await ctx.service.deliveryTimeType.getList(ctx.request.body);

    this.success(list);
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
   * 获取订单详情
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
   * 创建订单
   */
  async createBill() {
    const { ctx } = this;
    const rule = {
      goodsOrder: 'object',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.goodsOrder.createBill(ctx.request.body);

    this.success(uuid);
  }

  /**
   * 取消订单
   */
  async cancelBill() {
    const { ctx } = this;
    const rule = {
      uuid: 'string',
      version: 'number',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.goodsOrder.cancelBill(ctx.request.body);

    this.success(uuid);
  }

  /**
   * 根据uuid获取用户地址
   */
  async getAddress() {
    const { ctx } = this;
    const { uuid } = ctx.request.body;
    const address = await ctx.service.user.customer.address.get(uuid);

    this.success(address);
  }

  /**
   * 获取用户默认地址
   */
  async getDefaultAddress() {
    const { ctx } = this;
    const address = await ctx.service.user.customer.address.getDefault(ctx.request.body);

    this.success(address);
  }

  /**
   * 设置用户默认地址
   */
  async setDefaultAddress() {
    const { ctx } = this;
    const uuid = await ctx.service.user.customer.address.setDefault(ctx.request.body);

    this.success(uuid);
  }

  /**
   * 删除用户地址
   */
  async deleteAddress() {
    const { ctx } = this;
    const uuid = await ctx.service.user.customer.address.delete(ctx.request.body);

    this.success(uuid);
  }

  /**
   * 获取用户地址列表
   */
  async getAddressList() {
    const { ctx } = this;
    const addressList = await ctx.service.user.customer.address.getList(ctx.request.body);

    this.success(addressList);
  }

  /**
   * 新增用户地址
   */
  async saveNewAddress() {
    const { ctx } = this;
    const rule = {
      address: 'object',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.user.customer.address.saveNew(ctx.request.body);

    this.success(uuid);
  }

  /**
   * 修改用户地址
   */
  async saveModifyAddress() {
    const { ctx } = this;
    const rule = {
      address: 'object',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.user.customer.address.saveModify(ctx.request.body);

    this.success(uuid);
  }

  /**
   * 登录
   * @return {Function|null} 登录结果
   */
  async login() {
    const { ctx, app, _ } = this;
    const { merchantUuid, code } = ctx.request.body;
    const sessionid = ctx.helper.uuidv1();

    // 根据merchantUuid获取商家
    const merchant = await ctx.service.user.base.getMerchant(merchantUuid);

    if (_.isEmpty(merchant)) {
      return this.fail(999, '该应用未绑定商家');
    }

    // 登录凭证校验
    const weappInfo = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${merchant.appId}&secret=${merchant.appSecret}&js_code=${code}&grant_type=authorization_code`, {
      dataType: 'json',
    }) || {};

    const { openid: openId, session_key } = weappInfo.data || {};

    if (openId) {
      const result = JSON.stringify({ openId, session_key });
      // 保存openId和session_key到redis
      await app.redis.setex(sessionid, 3600 * 24, result);
    } else {
      return this.fail(999, weappInfo.data.errmsg);
    }

    this.success(sessionid);
  }
}

module.exports = WeappController;
