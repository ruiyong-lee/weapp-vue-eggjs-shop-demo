'use strict';

const Service = require('egg').Service;

/**
 * Service - 订货单
 * @class
 * @author ruiyong-lee
 */
class GoodsOrderService extends Service {
  /**
   * 获取订单分页列表
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async query(params = {}) {
    const { app } = this;
    const { Sequelize } = app;
    return await app.model.GoodsOrder.query({
      ...params,
      attributes: [
        'uuid', 'version', 'status', 'billNumber', 'customerName', 'deliveryTimeTypeName',
        'remark', 'createdTime', 'linkMan', 'linkPhone',
        [Sequelize.fn('0+CAST', Sequelize.literal('goodsTotalQty AS CHAR')), 'goodsTotalQty'],
        [Sequelize.fn('ROUND', Sequelize.col('paymentAmount'), 2), 'paymentAmount'],
      ],
    });
  }

  /**
   * 获取订单分页列表（小程序使用）
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async queryForWeapp(params = {}) {
    const { app } = this;
    const { Sequelize } = app;
    return await app.model.GoodsOrder.query({
      ...params,
      attributes: [
        'uuid', 'version', 'status', 'billNumber',
        [Sequelize.fn('0+CAST', Sequelize.literal('goodsTotalQty AS CHAR')), 'goodsTotalQty'],
        [Sequelize.fn('ROUND', Sequelize.col('paymentAmount'), 2), 'paymentAmount'],
      ],
    });
  }

  /**
   * 获取订单
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async get(params = {}) {
    const { app, ctx } = this;
    const { Sequelize } = app;
    const orderData = await app.model.GoodsOrder.get({
      ...params,
      orderAttributes: [
        'uuid', 'version', 'status', 'billNumber', 'addressUuid', 'linkMan', 'linkPhone', 'address', 'goodsTotalQty',
        'deliveryTimeTypeUuid', 'deliveryTimeTypeName', 'deliveryTimeTypeRemark', 'remark', 'createdTime', 'customerName',
        [Sequelize.fn('ROUND', Sequelize.col('totalAmount'), 2), 'totalAmount'],
        [Sequelize.fn('ROUND', Sequelize.col('freightAmount'), 2), 'freightAmount'],
        [Sequelize.fn('ROUND', Sequelize.col('paymentAmount'), 2), 'paymentAmount'],
        [Sequelize.fn('ROUND', Sequelize.col('reductionAmount'), 2), 'reductionAmount'],
        [Sequelize.fn('ROUND', Sequelize.col('deliveryTimeTypeSurcharge'), 2), 'deliveryTimeTypeSurcharge'],
      ],
      orderLineAttributes: [
        'uuid', 'goodsPic', 'unitName', 'goodsName', 'goodsUuid', 'goodsSpec', 'goodsCategoryName', 'remark',
        [Sequelize.fn('ROUND', Sequelize.col('salePrice'), 2), 'salePrice'],
        [Sequelize.fn('0+CAST', Sequelize.literal('goodsQty AS CHAR')), 'goodsQty'],
      ],
    });

    if (app._.isEmpty(orderData)) {
      ctx.throw(200, '查询不到指定的订单');
    }

    return orderData;
  }

  /**
   * 根据uuid获取订单，不验证组织
   * @param {string} uuid - 条件
   * @return {object|null} - 查找结果
   */
  async getByUuid(uuid) {
    const { app } = this;
    return await app.model.GoodsOrder.getByUuid(uuid);
  }

  /**
   * 创建订单
   * @param {object} params - 条件
   * @return {string} - 订单uuid
   */
  async saveNew({ orgUuid, goodsOrder = {}, openId, nickName }) {
    const { service, app } = this;
    const crateInfo = app.getCrateInfo(openId, nickName);
    const billNumber = await app.getBillNumber('DG');
    const params = {
      ...goodsOrder,
      ...crateInfo,
      billNumber,
      orgUuid,
      customerUuid: openId,
      customerName: nickName,
      status: 'initial',
    }

    const goodsUuid = await app.model.GoodsOrder.saveNew(params);

    if (goodsUuid) {
      // 超过30分钟自动取消订单
      app.addDelayTask('cancelOrder', goodsUuid, {}, 1800);

      // 推送新订单消息
      await service.notice.send('new_order', {
        title: '新订单',
        content: billNumber,
        orgUuid,
      });
    }

    return goodsUuid;
  }

  /**
   * 取消订单
   * @param {object} params - 条件
   * @return {string} - 订单uuid
   */
  async cancel(params = {}) {
    const { app } = this;
    const { openId, nickName, userUuid, userName, orgUuid } = params;
    const modifyInfo = app.getModifyInfo(openId || userUuid, nickName || userName);
    return await app.model.GoodsOrder.cancel({ ...params, ...modifyInfo, orgUuid });
  }

  /**
   * 审核订单
   * @param {object} params - 条件
   * @return {string} - 订单uuid
   */
  async audit(params = {}) {
    const { app } = this;
    const { openId, nickName, userUuid, userName, orgUuid } = params;
    const modifyInfo = app.getModifyInfo(openId || userUuid, nickName || userName);
    return await app.model.GoodsOrder.audit({ ...params, ...modifyInfo, orgUuid });
  }

  /**
   * 配送订单
   * @param {object} params - 条件
   * @return {string} - 订单uuid
   */
  async dispatch(params = {}) {
    const { app } = this;
    const { userUuid, userName, orgUuid } = params;
    const modifyInfo = app.getModifyInfo(userUuid, userName);
    return await app.model.GoodsOrder.dispatch({ ...params, ...modifyInfo, orgUuid });
  }

  /**
   * 完成订单
   * @param {object} params - 条件
   * @return {string} - 订单uuid
   */
  async complete(params = {}) {
    const { app } = this;
    const { openId, nickName, userUuid, userName, orgUuid } = params;
    const modifyInfo = app.getModifyInfo(openId || userUuid, nickName || userName);
    return await app.model.GoodsOrder.complete({ ...params, ...modifyInfo, orgUuid });
  }
}

module.exports = GoodsOrderService;
