'use strict';

const Controller = require('../core/base_controller');

/**
 * Controller - 微信小程序
 * @class
 * @author ruiyong-lee
 */
class WeappController extends Controller {
  /**
   * 获取key为类别的商品数据
   */
  async getGoodsWithCategory() {
    const { ctx } = this;
    const { orgUuid } = ctx.request.body;
    const goods = await ctx.service.goods.getGoodsWithCategory(orgUuid);

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
   * 获取订单分页列表
   */
  async queryOrderBill() {
    const { ctx } = this;
    const goodsOrderData = await ctx.service.goodsOrder.queryForWeapp(ctx.request.body);

    this.success(goodsOrderData);
  }

  /**
   * 获取订单详情
   */
  async getOrderBill() {
    const { ctx } = this;
    const goodsOrder = await ctx.service.goodsOrder.get(ctx.request.body);

    this.success(goodsOrder);
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
    const uuid = await ctx.service.goodsOrder.saveNew(ctx.request.body);

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
    const uuid = await ctx.service.goodsOrder.cancel(ctx.request.body);

    this.success(uuid);
  }

  /**
   * 线下支付订单（相当于审核订单）
   */
  async auditBill() {
    const { ctx } = this;
    const rule = {
      uuid: 'string',
      version: 'number',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.goodsOrder.audit(ctx.request.body);

    this.success(uuid);
  }

  /**
   * 完成订单
   */
  async completeBill() {
    const { ctx } = this;
    const rule = {
      uuid: 'string',
      version: 'number',
    };
    ctx.validate(rule);
    const uuid = await ctx.service.goodsOrder.complete(ctx.request.body);

    this.success(uuid);
  }

  /**
   * 根据uuid获取用户地址
   */
  async getAddress() {
    const { ctx } = this;
    const address = await ctx.service.user.customer.address.get(ctx.request.body);

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
    const uuid = await ctx.service.user.customer.address.remove(ctx.request.body);

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
   * 根据uuid获取商家
   */
  async getMerchant() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const merchant = await ctx.service.user.merchant.get(uuid);
    this.success(merchant);
  }

  /**
   * 登录
   * @return {function|null} 登录结果
   */
  async login() {
    const { ctx, app } = this;
    const { orgUuid, code } = ctx.request.body;
    const sessionid = ctx.helper.uuidv1();

    // 根据orgUuid获取商家
    const merchant = await ctx.service.user.merchant.get(orgUuid);

    if (app._.isEmpty(merchant)) {
      return this.fail(ctx.ERROR_CODE, '该应用未绑定商家');
    }

    // 登录凭证校验
    const weappInfo = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${merchant.appId}&secret=${merchant.appSecret}&js_code=${code}&grant_type=authorization_code`, {
      dataType: 'json',
    }) || {};

    const { openid: openId, session_key } = weappInfo.data || {};

    if (openId) {
      const result = JSON.stringify({ openId, session_key });
      // 保存openId和session_key到redis
      await app.redis.get('default').setex(sessionid, 3600 * 24, result);
    } else {
      return this.fail(ctx.ERROR_CODE, weappInfo.data.errmsg);
    }

    this.success(sessionid);
  }
}

module.exports = WeappController;
