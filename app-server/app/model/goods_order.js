'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const goodsOrderSchema = require('../schema/goodsorder.js')(app);
  const goodsOrderLineSchema = require('../schema/goodsorderline')(app);
  const GoodsOrder = db.defineModel(app, 'goodsorder', goodsOrderSchema);
  const GoodsOrderLine = db.defineModel(app, 'goodsorderline', goodsOrderLineSchema, {
    timestamps: false,
    freezeTableName: true,
  });

  // 关系
  GoodsOrder.hasMany(GoodsOrderLine, { foreignKey: 'billUuid', as: 'lines' });

  /**
   * 查询订单分页列表
   * @param {object} { attributes, pagination, filter, sort, orgUuid, openId } - 条件
   * @return {object|null} - 查找结果
   */
  GoodsOrder.query = async ({ attributes, pagination = {}, filter = {}, sort = [], orgUuid, openId }) => {
    const { page, pageSize: limit } = pagination;
    const { keywordsLike, daterange, status } = filter;
    const order = app.getSortInfo(sort);
    const condition = {
      offset: (page - 1) * limit,
      limit,
      order,
      attributes,
      where: { orgUuid },
    };

    if (openId) {
      condition.where.customerUuid = openId;
    }

    if (status) {
      condition.where.status = status;
    }

    if (keywordsLike) {
      condition.where.$or = [
        { billNumber: { $like: `%%${keywordsLike}%%` } },
        { customerName: { $like: `%%${keywordsLike}%%` } },
      ];
    }

    if (!app._.isEmpty(daterange)) {
      const startDate = new Date(daterange[0]);
      const endDate = new Date(daterange[1]);

      if (app._.isDate(startDate) && app._.isDate(endDate)) {
        condition.where.createdTime = {
          $gt: startDate,
          $lt: endDate,
        };
      }
    }

    const { count, rows } = await GoodsOrder.findAndCountAll(condition);

    return { page, count, rows };
  };

  /**
   * 查询订单列表
   * @param {object} { attributes, filter, orgUuid, openId } - 条件
   * @return {object|null} - 查找结果
   */
  GoodsOrder.getList = async ({ attributes, filter = {}, orgUuid, openId }) => {
    const { keywordsLike, daterange, status } = filter;
    const condition = {
      attributes,
      where: { orgUuid },
    };

    if (openId) {
      condition.where.customerUuid = openId;
    }

    if (status) {
      condition.where.status = status;
    }

    if (keywordsLike) {
      condition.where.$or = [
        { billNumber: { $like: `%%${keywordsLike}%%` } },
        { customerName: { $like: `%%${keywordsLike}%%` } },
      ];
    }

    if (!app._.isEmpty(daterange)) {
      const startDate = new Date(daterange[0]);
      const endDate = new Date(daterange[1]);

      if (app._.isDate(startDate) && app._.isDate(endDate)) {
        condition.where.createdTime = {
          $gt: startDate,
          $lt: endDate,
        };
      }
    }

    return await GoodsOrder.findAll(condition);
  };

  /**
   * 查询订单
   * @param {object} { orderAttributes, orderLineAttributes, uuid, orgUuid } - 条件
   * @return {object|null} - 查找结果
   */
  GoodsOrder.get = async ({ orderAttributes, orderLineAttributes, uuid, orgUuid }) => {
    return await GoodsOrder.findOne({
      attributes: orderAttributes,
      include: [
        {
          model: GoodsOrderLine,
          as: 'lines',
          attributes: orderLineAttributes,
        },
      ],
      where: { uuid, orgUuid },
    });
  };

  /**
   * 根据uuid查询订单
   * @param {object} uuid - 订单uuid
   * @return {object|null} - 查找结果
   */
  GoodsOrder.getByUuid = async uuid => await GoodsOrder.findById(uuid);

  /**
   * 创建订单
   * @param {object} { goodsOrder, goodsOrderLines } - 条件
   * @return {string} - 返回订单uuid
   */
  GoodsOrder.saveNew = async ({ goodsOrder, goodsOrderLines }) => {
    const transaction = await app.transition();

    goodsOrder = await GoodsOrder.create(goodsOrder, { transaction });
    goodsOrderLines = goodsOrderLines.map(item => {
      item.billUuid = goodsOrder.uuid;
      return item;
    });

    await GoodsOrderLine.bulkCreate(goodsOrderLines, { transaction });

    return goodsOrder.uuid;
  };

  /**
   * 取消订单
   * @param {object} params - 条件
   * @return {string} - 订单uuid
   */
  GoodsOrder.cancel = async params => {
    const { uuid, orgUuid, version, lastModifierId, lastModifierName } = params;
    const result = await GoodsOrder.update({ status: 'canceled', lastModifierId, lastModifierName }, {
      where: { uuid, orgUuid, status: 'initial', version: version - 1 },
      fields: ['status', 'lastModifierId', 'lastModifierName'],
    });
    app.checkUpdate(result);

    return uuid;
  };

  /**
   * 配送订单
   * @param {object} params - 条件
   * @return {string} - 订单uuid
   */
  GoodsOrder.dispatch = async params => {
    const { uuid, orgUuid, version, lastModifierId, lastModifierName } = params;
    const result = await GoodsOrder.update({ status: 'dispatching', lastModifierId, lastModifierName }, {
      where: { uuid, orgUuid, status: 'audited', version: version - 1 },
      fields: ['status', 'lastModifierId', 'lastModifierName'],
    });
    app.checkUpdate(result);

    return uuid;
  };

  /**
   * 完成订单
   * @param {object} params - 条件
   * @return {string} - 订单uuid
   */
  GoodsOrder.complete = async params => {
    const { uuid, orgUuid, version, lastModifierId, lastModifierName } = params;
    const result = await GoodsOrder.update({ status: 'completed', lastModifierId, lastModifierName }, {
      where: { uuid, orgUuid, status: 'dispatching', version: version - 1 },
      fields: ['status', 'lastModifierId', 'lastModifierName'],
    });
    app.checkUpdate(result);

    return uuid;
  };

  return GoodsOrder;
};

